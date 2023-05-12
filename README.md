# NomicCDSApplication

## How to run
`make build` will build a docker container for both the FastAPI backend and NextJS frontend.

`make run` will start both instances. App can be found at http://127.0.0.1:3000

## Nomic Discord Dashboard built for the Community Data Scientist role @ NomicAI.
Features:
- Weekly user growth chart w/ external events (based on tweets from @nomicAI's twitter) annotated.
- Top Contributors donut chart.
- Lurker : Contributor ratio donut chart.
- Top "engaged" messages (measured based on reactions).
- Median time to 1st contribution in Discord (measures the speed at which users convert from lurkers to contributors/engagers - lower time, the more engaged new-comers are).
- Overall Sentiment -> used twitter-roberta-base model to classify full dataset (excluding joins channel) of >70k messages (1st order approximation of community health/engagement, of course in a production setting, this would need finetuning, better data cleaning, etc.).
- Top topics as extracted via Atlas.
- Embedded Atlas map.
- Dockerized FastAPI.

Notes:
- Scripts directory holds both the script to scrape Discord messages (requires an auth token) and perform sentiment analysis using a HuggingFace inference endpoint.
- Instead of rolling a db (i.e. sqlite) I opted to use a pandas dataframe loaded in memory as the datasets were relatively small.
