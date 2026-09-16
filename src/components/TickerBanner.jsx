const ITEMS = [
  { label: 'KRONOS 80', highlight: true },
  { label: '1000Hz Polling' },
  { label: 'CNC Aluminium' },
  { label: 'Gasket Mount', highlight: true },
  { label: 'Hot-Swap PCB' },
  { label: 'BLE 5.2' },
  { label: '4000mAh Battery', highlight: true },
  { label: 'PBT Keycaps' },
  { label: 'Sub-1ms Latency' },
  { label: '80% Form Factor', highlight: true },
  { label: 'Pre-lubed Switches' },
  { label: 'USB-C / 2.4GHz' },
]

export default function TickerBanner() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="ticker-wrap relative z-20">
      <div className="ticker-track" id="ticker-track">
        {doubled.map((item, i) => (
          <div key={i} className={`ticker-item${item.highlight ? ' highlight' : ''}`}>
            <span className="dot"></span>{item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
