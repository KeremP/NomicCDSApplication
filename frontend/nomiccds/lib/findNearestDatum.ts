
import { bisector } from 'd3-array';
import { scaleLinear, scaleTime } from '@visx/scale';

export type DataPoint = {
    timestamp: string
    value:number
};

export default function findNearestDatum({
  value,
  scale,
  accessor,
  data,
}: {
  value: number;
  scale: ReturnType<typeof scaleLinear | typeof scaleTime>;
  accessor: (d: DataPoint) => number;
  data: DataPoint[];
}): DataPoint {
  const bisect = bisector(accessor).left;
  const nearestValue = scale.invert(value) as number;
  const nearestValueIndex = bisect(data, nearestValue, 1);
  const d0 = data[nearestValueIndex - 1];
  const d1 = data[nearestValueIndex];
  let nearestDatum = d0;
  if (d1 && accessor(d1)) {
    nearestDatum = nearestValue - accessor(d0) > accessor(d1) - nearestValue ? d1 : d0;
  }
  return nearestDatum;
}