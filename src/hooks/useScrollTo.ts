export default function useScrollTo(ref: React.RefObject<HTMLElement>) {
  return () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
}
