export function HeroSection() {
  return (
    <section
      className="relative flex flex-col"
      style={{
        minHeight: "100vh",   // fallback
        minHeight: "100svh",  // современный mobile-safe viewport
        overflow: "hidden",
      }}
    >
      <div className="flex-1 flex flex-col justify-center">
        <h1>Больше продаж для бизнеса</h1>
        <p>
          Разрабатываем сайты, запускаем рекламу и выстраиваем продажи в Сочи.
        </p>
      </div>
    </section>
  );
}