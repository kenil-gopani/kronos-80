import { CONFIG_DATA } from './ConfiguratorSection'

export default function SpecsSection({ currentSwitch }) {
  const switchName = CONFIG_DATA.switches[currentSwitch]

  return (
    <section id="specs" className="py-32 bg-engineering-surface relative">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-start relative z-10">
        <div className="reveal lg:col-span-7">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-engineering-accent"></div>
            <p className="text-xs uppercase tracking-[0.3em] text-engineering-accent font-mono font-bold">03 / Data Sheet</p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl mt-2 tracking-tight font-bold glitch-hover" data-text="Hardware Specifications.">Hardware Specifications.</h2>
          <p className="text-engineering-textMuted mt-6 text-xl">The complete technical parameter breakdown.</p>
          
          <div className="mt-12 rounded-3xl border border-engineering-border bg-engineering-base overflow-hidden shadow-2xl">
            <div className="divide-y divide-engineering-border/50">
              <SpecRow label="Form Factor" value="80% Tenkeyless" />
              <SpecRow label="Chassis Material" value="CNC 6061-T6 Aluminum" />
              <SpecRow label="Switch Module" value={switchName} />
              <SpecRow label="Telemetry (Polling)" value="1000Hz (Wired/2.4G)" />
              <SpecRow label="Keycap Material" value="PBT Double-Shot (1.5mm)" />
              <SpecRow label="Network Link" value="BLE 5.2 / 2.4G / USB-C" />
              <SpecRow label="Power Cell" value="4000mAh (Up to 80h)" />
              <SpecRow label="Dimensions / Mass" value="340 × 140 × 36 mm / 1.85kg" />
            </div>
          </div>
        </div>
        
        <div className="reveal delay-1 lg:col-span-5 lg:mt-32">
          <div className="rounded-3xl border border-engineering-border bg-engineering-base p-10 relative overflow-hidden group shadow-2xl">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-engineering-accent/5 rounded-full blur-[80px] group-hover:bg-engineering-accent/10 transition-colors duration-700"></div>
            <h3 className="font-display text-3xl text-engineering-text relative z-10 tracking-tight font-bold mb-2">Inventory Manifest</h3>
            <p className="text-engineering-textMuted text-sm font-mono relative z-10 mb-8 uppercase tracking-widest">Included Hardware</p>
            
            <div className="grid gap-4 relative z-10">
              <ManifestItem num="01" text="KRONOS 80 Chassis & PCB" />
              <ManifestItem num="02" text="87x Switch Set (Pre-lubed)" />
              <ManifestItem num="03" text="Braided Coiled Aviator Cable" />
              <ManifestItem num="04" text="Switch/Keycap Puller Tool" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SpecRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between px-8 py-5 group hover:bg-engineering-surface transition-colors gap-2">
      <span className="text-engineering-textMuted font-mono text-sm tracking-wide uppercase">{label}</span>
      <b className="text-engineering-text font-display text-lg tracking-wide">{value}</b>
    </div>
  )
}

function ManifestItem({ num, text }) {
  return (
    <div className="p-4 rounded-2xl bg-engineering-surface border border-engineering-border flex items-center gap-5 hover:border-engineering-accent/40 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-engineering-surface2 grid place-items-center text-engineering-accent font-mono border border-engineering-border font-bold">{num}</div>
      <span className="text-base font-medium text-engineering-text tracking-wide">{text}</span>
    </div>
  )
}
