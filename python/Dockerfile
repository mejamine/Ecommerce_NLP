FROM python:3.11.0

WORKDIR /app

COPY . ./

RUN pip install -r requirements.txt

RUN python -m spacy download en_core_web_sm

EXPOSE 5000

