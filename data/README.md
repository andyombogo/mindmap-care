# Data

Use this folder for local data staging and schema notes.

Recommended layout:

```text
data/
|-- raw/        private or source exports; ignored by git
|-- processed/  generated cleaned data; ignored by git
|-- synthetic/  safe fictional demo records for prototyping
`-- schemas/    safe schema documentation or synthetic examples
```

Never commit raw patient, client, clinical, or private operational data.

The `synthetic/` folder may contain fictional data for demos and tests. Synthetic data must be clearly labelled and must not be used as validation evidence.
