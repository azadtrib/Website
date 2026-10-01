import PackPicker from "./PackPicker";
import PreorderSteps from "./PreorderSteps";

export default function FirstDrop() {
  return (
    <section id="first-drop" className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-5">
        <p className="text-teal text-xs font-semibold uppercase tracking-widest">Pre-orders open</p>
        <h2 className="text-3xl sm:text-4xl font-bold mt-3">Pre-order the first drop.</h2>
        <p className="text-ink/70 text-lg mt-4 max-w-2xl">
          One bottle, or stock up. Every pack is the same oil.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 items-start">
          <div className="bg-navy border border-ink/10 rounded-3xl p-5 sm:p-7">
            <PackPicker />
          </div>
          <PreorderSteps />
        </div>
      </div>
    </section>
  );
}
