import { useEffect, useState } from "react";
import "./App.css";

const CAT_ENDPOINT_RANDOM_FACT = `https://catfact.ninja/fact`;
const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/text`;
const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

export function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      });
  }, []);

  useEffect(() => {
    if (fact) {
      const threeFirstWords = fact.split(" ", 3).join(" ");

      fetch(
        `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`
      )
        .then((res) => res.json())
        .then((data) => {
          const { url } = data;
          setImageUrl(url);
        });
    }
  }, [fact]);

  return (
    <main>
      <h1>App de gatitos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
          alt={`Image extracted using the first three words of ${fact}`}
        />
      )}
    </main>
  );
}
