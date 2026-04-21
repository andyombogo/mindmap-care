# Data

Use this folder for local data staging and schema notes.

Recommended layout:

```text
data/
|-- raw/        private or source exports; ignored by git
|-- processed/  generated cleaned data; ignored by git
`-- schemas/    safe schema documentation or synthetic examples
```

Never commit raw patient, client, clinical, or private operational data.
