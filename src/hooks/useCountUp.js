import { useEffect, useState } from "react";

// Conta de 0 até "alvo" quando "ativo" vira true.
export default function useCountUp(alvo, ativo, duracao = 1200) {
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (!ativo) return;

    let frame;
    const inicio = performance.now();

    const passo = (agora) => {
      const progresso = Math.min((agora - inicio) / duracao, 1);
      setValor(Math.round(alvo * (1 - Math.pow(1 - progresso, 3))));
      if (progresso < 1) frame = requestAnimationFrame(passo);
    };

    frame = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(frame);
  }, [alvo, ativo, duracao]);

  return valor;
}
