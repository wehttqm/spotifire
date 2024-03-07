import chromadb
import chromadb.utils.embedding_functions as embedding_functions
import os

openai_ef = embedding_functions.OpenAIEmbeddingFunction(
                api_key=os.getenv('openai_api_key'),
                model_name="text-embedding-ada-002"
            )

chroma_client = chromadb.PersistentClient(path="vectordb")

collection = chroma_client.get_collection(name="vector_search",
                                             embedding_function=openai_ef)

results = collection.query(
    query_texts=["Get me house music from the swedish guy who died in 2018"],
    n_results=2
)

print(results)