export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)] sm:p-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Fit Guide</p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-950 sm:text-5xl">Apparel Size Chart</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">
          Find your perfect fit with our comprehensive garment measurement guide.
        </p>

        {/* Women's Size Chart */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-stone-950">Women’s Apparel (Inches)</h2>
          <div className="mt-4 overflow-x-auto rounded-[16px] border border-stone-200">
            <table className="w-full text-left text-sm text-stone-700">
              <thead className="bg-stone-100 text-xs uppercase tracking-wider text-stone-900">
                <tr>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Bust (in)</th>
                  <th className="px-6 py-4">Waist (in)</th>
                  <th className="px-6 py-4">Hips (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr><td className="px-6 py-4 font-semibold">XS</td><td className="px-6 py-4">31 - 32</td><td className="px-6 py-4">24 - 25</td><td className="px-6 py-4">34 - 35</td></tr>
                <tr><td className="px-6 py-4 font-semibold">S</td><td className="px-6 py-4">33 - 34</td><td className="px-6 py-4">26 - 27</td><td className="px-6 py-4">36 - 37</td></tr>
                <tr><td className="px-6 py-4 font-semibold">M</td><td className="px-6 py-4">35 - 36</td><td className="px-6 py-4">28 - 29</td><td className="px-6 py-4">38 - 39</td></tr>
                <tr><td className="px-6 py-4 font-semibold">L</td><td className="px-6 py-4">37 - 39</td><td className="px-6 py-4">30 - 32</td><td className="px-6 py-4">40 - 42</td></tr>
                <tr><td className="px-6 py-4 font-semibold">XL</td><td className="px-6 py-4">40 - 42</td><td className="px-6 py-4">33 - 35</td><td className="px-6 py-4">43 - 45</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Men's / Unisex Size Chart */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-stone-950">Men’s & Unisex Jackets / Sweaters</h2>
          <div className="mt-4 overflow-x-auto rounded-[16px] border border-stone-200">
            <table className="w-full text-left text-sm text-stone-700">
              <thead className="bg-stone-100 text-xs uppercase tracking-wider text-stone-900">
                <tr>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Chest (in)</th>
                  <th className="px-6 py-4">Waist (in)</th>
                  <th className="px-6 py-4">Shoulder (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr><td className="px-6 py-4 font-semibold">S</td><td className="px-6 py-4">36 - 38</td><td className="px-6 py-4">30 - 31</td><td className="px-6 py-4">17.5</td></tr>
                <tr><td className="px-6 py-4 font-semibold">M</td><td className="px-6 py-4">39 - 41</td><td className="px-6 py-4">32 - 34</td><td className="px-6 py-4">18.0</td></tr>
                <tr><td className="px-6 py-4 font-semibold">L</td><td className="px-6 py-4">42 - 44</td><td className="px-6 py-4">35 - 37</td><td className="px-6 py-4">18.5</td></tr>
                <tr><td className="px-6 py-4 font-semibold">XL</td><td className="px-6 py-4">45 - 47</td><td className="px-6 py-4">38 - 40</td><td className="px-6 py-4">19.2</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
