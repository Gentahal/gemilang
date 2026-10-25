export default function WeatherWidget() {
  return (
    <div className="lg:col-span-4 p-space-lg rounded-xl bg-surface shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-sm">hub</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
              External API Node
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-status-done font-label-sm text-label-sm font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-status-done"></span>
            Live Feed
          </span>
        </div>

        <div className="flex items-center justify-between mt-space-sm">
          <div>
            <span className="font-label-sm text-label-sm text-secondary block">
              Kantor Pusat Biro
            </span>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
              DKI Jakarta
            </h3>
            <p className="font-body-sm text-body-sm text-secondary mt-0.5">
              Cerah Berawan
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-start justify-end">
              <span className="font-display-lg text-display-lg font-bold text-on-surface">
                29
              </span>
              <span className="font-headline-md text-headline-md text-secondary mt-1">
                °C
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary">
              Feels like 32°C
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-space-sm mt-space-md pt-space-sm">
          <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col">
            <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">water_drop</span> Kelembapan
            </span>
            <span className="font-title-sm text-title-sm text-on-surface font-semibold mt-1">
              74%
            </span>
          </div>
          <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col">
            <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">air</span> Kecepatan Angin
            </span>
            <span className="font-title-sm text-title-sm text-on-surface font-semibold mt-1">
              14 km/h
            </span>
          </div>
        </div>
      </div>

      <div className="mt-space-md pt-space-sm flex items-center justify-between font-label-sm text-label-sm text-secondary">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">update</span>
          Diperbarui: 11:45 WIB
        </span>
        <span className="font-medium text-on-surface">BMKG Open Data API</span>
      </div>
    </div>
  );
}
