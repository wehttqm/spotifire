import chromadb

chroma_client = chromadb.Client()
collection = chroma_client.create_collection(name="vector_search")

with open('genre_data.txt') as file:
    documents = []
    metadatas = []
    ids = []
    id = 1

    for row in file:
        row = row.split(',', 1)
        documents.append(row[1].strip('\n'))
        metadatas.append({'item_id': row[0]})
        ids.append(f'id{id}')
        id += 1

collection.add(
    documents=documents,
    metadatas=metadatas,
    ids=ids
)

results = collection.query(
    query_texts=["Get me calm songs I can listen to when sleeping"],
    n_results=2
)

print(results)