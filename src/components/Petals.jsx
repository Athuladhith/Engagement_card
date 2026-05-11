function Petals() {
  return (
    <div className="petals">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="petal" style={{ left: `${10 + i * 10}%`, animationDelay: `${i * 0.5}s` }}></div>
      ))}
    </div>
  )
}

export default Petals