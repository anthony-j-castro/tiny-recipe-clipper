import { useRef } from "react";

const FLAVOR_TEXTS = [
  "“Mmm, that looks good!”",
  "“You have great taste!”",
  "“Can’t wait to see how this turns out!”",
];

const useFlavorText = () => {
  const ref = useRef(
    FLAVOR_TEXTS[Math.floor(Math.random() * FLAVOR_TEXTS.length)],
  );

  return ref.current;
};

export default useFlavorText;
