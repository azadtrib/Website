import PackPicker from "./PackPicker";
import PreorderSteps from "./PreorderSteps";
import SectionHeader from "./SectionHeader";

export default function FirstDrop() {
  return (
    <section id="first-drop" className="texture border-y border-ink/[0.06] py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeader
          eyebrow="Pre-orders open"
          title="Pre-order"
          muted="the first drop."
          lede="One bottle, or stock up. Every pack is the same oil."
        />
        <div className="mt-12 grid gap-10 sm:grid-cols-2 items-start">
          <div className="card bg-navy p-5 sm:p-7">
            <PackPicker />
          </div>
          <PreorderSteps />
        </div>
      </div>
    </section>
  );
}
