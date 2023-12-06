import pandas as pd

df = pd.read_csv("pharmacy_products_dataset.csv")
df = df.drop(
    columns=[
        "url",
        "weight",
        "availability",
        "ingredients",
        "warnings",
        "breadcrumbs",
        "images",
        "uniq_id",
        "scraped_at",
    ]
)
df = df.fillna("")
# print(df.head())

text_col = []
for _, row in df.iterrows():
    prompt = """You're a brazilian portuguese pharmacy store attendant that works in a pharmacy.\nYour job is to help customer to get the info their need about the store and the products you are selling.\nYour should only answer in brazilian portuguese (PT-BR)."""
    title = str(row["title"])
    brand = str(row["brand"])
    price = str(row["price"])
    currency = str(row["currency"])
    description = str(row["description"])

    text = (
        prompt
        + "\n### Título: "
        + title
        + "\n### Marca: "
        + brand
        + "\n### Descrição: "
        + description
        + "\n### Preço: "
        + price
        + "\n### Moeda: "
        + currency
    )
    text_col.append(text)

df.loc[:, "text"] = text_col
print(df.head())

df.to_csv("trained_result.csv", index=False)
