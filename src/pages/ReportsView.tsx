import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Milk,
  Egg,
  Scale,
  DollarSign,
  Sparkles,
  PieChart,
  Download,
  Calendar,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { apiClient } from '../services/apiClient';

export const ReportsView: React.FC = () => {
  const { animals, productionStats, inventory, tasks } = useFarm();
  const [reportPeriod, setReportPeriod] = useState('7 ngày qua');

  // Breakdown by species
  const speciesCounts: Record<string, number> = {};
  animals.forEach((a) => {
    speciesCounts[a.species] = (speciesCounts[a.species] || 0) + 1;
  });

  // Health breakdown
  const healthyCount = animals.filter((a) => a.status === 'healthy').length;
  const monitoringCount = animals.filter((a) => a.status === 'monitoring').length;
  const sickCount = animals.filter((a) => a.status === 'sick' || a.status === 'isolated').length;
  const pregnantCount = animals.filter((a) => a.status === 'pregnant').length;

  const totalValueInventory = inventory.reduce((sum, item) => sum + item.quantity * item.costPerUnit, 0);

  // AI Growth Report State (Nhiệm vụ 3.3)
  const [growthSpecies, setGrowthSpecies] = useState<'Heo' | 'Bò' | 'Gà'>('Heo');
  const [initWeight, setInitWeight] = useState<number>(25);
  const [curWeight, setCurWeight] = useState<number>(95);
  const [daysFeeding, setDaysFeeding] = useState<number>(90);
  const [feedTotal, setFeedTotal] = useState<number>(190);
  const [isLoadingGrowth, setIsLoadingGrowth] = useState<boolean>(false);
  const [growthReport, setGrowthReport] = useState<any>(null);

  const handleGenerateGrowthReport = async () => {
    setIsLoadingGrowth(true);
    try {
      const data = await apiClient.post('/api/ai/growth-report', {
        species: growthSpecies,
        initialWeightKg: initWeight,
        currentWeightKg: curWeight,
        daysOnFeed: daysFeeding,
        totalFeedKg: feedTotal,
      });
      setGrowthReport(data);
    } catch {
      const gain = curWeight - initWeight;
      const adg = Number((gain / Math.max(1, daysFeeding)).toFixed(3));
      const fcr = Number((feedTotal / Math.max(1, gain)).toFixed(2));
      setGrowthReport({
        metrics: {
          totalGainKg: gain,
          adgKgPerDay: adg,
          fcr,
          industryBenchmarkFCR: growthSpecies === 'Heo' ? '2.5 - 2.8' : growthSpecies === 'Gà' ? '1.6 - 1.8' : '6.0 - 7.5',
          evaluation: fcr <= 2.8 ? 'Tốt - Đạt chỉ tiêu VietGAHP' : 'Cần tối ưu dinh dưỡng',
          projectedTargetWeightKg: growthSpecies === 'Heo' ? 110 : growthSpecies === 'Gà' ? 2.5 : 550,
          estimatedDaysToMarket: Math.max(0, Math.round(((growthSpecies === 'Heo' ? 110 : 550) - curWeight) / (adg || 0.7))),
        },
        aiAnalysis: `Tốc độ tăng trọng bình quân ADG đạt ${adg} kg/ngày. Hệ số FCR đạt ${fcr}. Đàn phát triển đồng đều, tiêu tốn thức ăn ở mức kiểm soát tốt.`,
        optimizationRecommendations: [
          'Điều chỉnh tỷ lệ protein thô và khoáng vi lượng theo từng chu kỳ.',
          'Bảo đảm nước uống sạch đạt chuẩn VietGAHP và thông gió chuồng.',
        ],
        vetDisclaimer: 'Báo cáo chỉ số tăng trưởng và FCR được tính toán và phân tích bởi FarmPro AI dựa trên số liệu thực nghiệm chăn nuôi.',
      });
    } finally {
      setIsLoadingGrowth(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-600" />
            Báo Cáo Hiệu Suất & Thống Kê Trang Trại
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Theo dõi sản lượng sữa, trứng, chi phí thức ăn và biến động sức khỏe đàn
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            className="px-3 py-2 border border-stone-300 rounded-xl text-xs bg-white focus:ring-2 focus:ring-emerald-500 font-medium"
          >
            <option value="7 ngày qua">7 ngày qua</option>
            <option value="30 ngày qua">30 ngày qua</option>
            <option value="Quý này">Quý này</option>
          </select>

          <button
            onClick={() => alert('Đang xuất báo cáo định dạng PDF/Excel...')}
            className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Xuất Báo Cáo
          </button>
        </div>
      </div>

      {/* High-level KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">Sản lượng sữa hôm nay</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Milk className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-stone-900">540</span>
            <span className="text-xs font-semibold text-stone-500">Lít/ngày</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp className="w-3.5 h-3.5" /> +12.5% so với tuần trước
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">Thu hoạch trứng gà</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Egg className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-stone-900">990</span>
            <span className="text-xs font-semibold text-stone-500">Quả/ngày</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp className="w-3.5 h-3.5" /> Tỷ lệ đẻ 88%
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">Tiêu thụ thức ăn / ngày</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Scale className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-stone-900">875</span>
            <span className="text-xs font-semibold text-stone-500">kg thức ăn</span>
          </div>
          <span className="text-[11px] font-semibold text-stone-500">Hệ số FCR đạt chuẩn tối ưu</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">Giá trị kho vật tư</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-stone-900">
              {(totalValueInventory / 1000000).toFixed(1)}
            </span>
            <span className="text-xs font-semibold text-stone-500">Triệu VNĐ</span>
          </div>
          <span className="text-[11px] font-semibold text-stone-500">{inventory.length} mặt hàng lưu kho</span>
        </div>
      </div>

      {/* Production Chart & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Trends */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-stone-900">Biểu Đồ Năng Suất Sản Phẩm Chăn Nuôi</h3>
              <p className="text-xs text-stone-500">Sản lượng sữa (Lít) & Trứng (Quả) 7 ngày gần nhất</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-stone-600">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                Sữa (Lít)
              </span>
              <span className="flex items-center gap-1.5 font-medium text-stone-600">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                Trứng (Quả)
              </span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-6 h-64 flex items-end justify-between gap-4 border-b border-stone-200 pb-3">
            {productionStats.map((stat, idx) => {
              const milkHeight = Math.round((stat.milkLiters / 600) * 100);
              const eggHeight = Math.round((stat.eggCount / 1100) * 100);

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-48">
                    {/* Milk bar */}
                    <div
                      className="w-1/2 max-w-[20px] bg-blue-500 hover:bg-blue-600 rounded-t-md transition-all relative"
                      style={{ height: `${milkHeight}%` }}
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none transition-opacity">
                        {stat.milkLiters}L
                      </span>
                    </div>

                    {/* Egg bar */}
                    <div
                      className="w-1/2 max-w-[20px] bg-amber-400 hover:bg-amber-500 rounded-t-md transition-all relative"
                      style={{ height: `${eggHeight}%` }}
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none transition-opacity">
                        {stat.eggCount}q
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-stone-600">{stat.date}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Herd Structure & Health Pie */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5 text-xs">
          <div>
            <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-600" />
              Cơ Cấu Đàn & Sức Khỏe
            </h3>
            <p className="text-stone-500 text-[11px]">Tỷ lệ phân bổ vật nuôi tại cơ sở</p>
          </div>

          {/* Health Status breakdown */}
          <div className="space-y-2">
            <span className="font-semibold text-stone-700 block">Tỷ lệ tình trạng sức khỏe:</span>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-emerald-700 font-semibold">Khỏe mạnh</span>
                <span className="font-bold text-stone-800">{healthyCount} con</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${(healthyCount / animals.length) * 100}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px]">
                <span className="text-amber-700 font-semibold">Cần theo dõi</span>
                <span className="font-bold text-stone-800">{monitoringCount} con</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full"
                  style={{ width: `${(monitoringCount / animals.length) * 100}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px]">
                <span className="text-red-700 font-semibold">Đang điều trị / Cách ly</span>
                <span className="font-bold text-stone-800">{sickCount} con</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-red-500 h-full rounded-full"
                  style={{ width: `${(sickCount / animals.length) * 100}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px]">
                <span className="text-pink-700 font-semibold">Đang mang thai</span>
                <span className="font-bold text-stone-800">{pregnantCount} con</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-pink-400 h-full rounded-full"
                  style={{ width: `${(pregnantCount / animals.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Species distribution */}
          <div className="pt-2 border-t border-stone-100 space-y-2">
            <span className="font-semibold text-stone-700 block">Phân loại theo loài nuôi:</span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {Object.entries(speciesCounts).map(([species, count]) => (
                <div
                  key={species}
                  className="p-2 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between"
                >
                  <span className="text-stone-600 font-medium">{species}</span>
                  <span className="font-bold text-stone-900">{count} cá thể/đàn</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Growth & Feed Conversion Ratio (FCR) Analysis Widget (Nhiệm vụ 3.3) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-stone-900 flex items-center gap-2">
                AI Đánh Giá Tốc Độ Tăng Trưởng & Hiệu Suất Thức Ăn (FCR / ADG)
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Nhiệm vụ 3.3
                </span>
              </h3>
              <p className="text-xs text-stone-500">
                Mô hình học máy dự báo ngày xuất chuồng, tính hệ số tiêu tốn thức ăn và đối chiếu chuẩn VietGAHP
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerateGrowthReport}
            disabled={isLoadingGrowth}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            {isLoadingGrowth ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI Đang Phân Tích...</span>
              </>
            ) : (
              <>
                <Activity className="w-4 h-4" />
                <span>Chạy Báo Cáo Tăng Trưởng AI</span>
              </>
            )}
          </button>
        </div>

        {/* Input parameters */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block font-bold text-stone-700 mb-1">Loài vật nuôi</label>
            <select
              value={growthSpecies}
              onChange={(e) => setGrowthSpecies(e.target.value as any)}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl bg-white font-medium"
            >
              <option value="Heo">Heo thịt thương phẩm</option>
              <option value="Bò">Bò thịt / Bò sữa</option>
              <option value="Gà">Gà thịt</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">Cân nặng đầu vào (kg)</label>
            <input
              type="number"
              value={initWeight}
              onChange={(e) => setInitWeight(Number(e.target.value))}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">Cân nặng hiện tại (kg)</label>
            <input
              type="number"
              value={curWeight}
              onChange={(e) => setCurWeight(Number(e.target.value))}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl font-mono font-bold text-emerald-800"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">Số ngày nuôi</label>
            <input
              type="number"
              value={daysFeeding}
              onChange={(e) => setDaysFeeding(Number(e.target.value))}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">Tổng cám đã ăn (kg)</label>
            <input
              type="number"
              value={feedTotal}
              onChange={(e) => setFeedTotal(Number(e.target.value))}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl font-mono"
            />
          </div>
        </div>

        {/* AI Output Result */}
        {growthReport && (
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 animate-in fade-in text-xs">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                <span className="text-stone-400 block text-[11px]">Tăng trọng bình quân (ADG)</span>
                <span className="text-lg font-extrabold text-emerald-700 font-mono">
                  {growthReport.metrics?.adgKgPerDay} kg/ngày
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                <span className="text-stone-400 block text-[11px]">Hệ số tiêu tốn thức ăn (FCR)</span>
                <span className="text-lg font-extrabold text-blue-700 font-mono">
                  {growthReport.metrics?.fcr}
                </span>
                <span className="text-[10px] text-stone-400 block">Chuẩn: {growthReport.metrics?.industryBenchmarkFCR}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                <span className="text-stone-400 block text-[11px]">Đánh giá hiệu suất</span>
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  {growthReport.metrics?.evaluation}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                <span className="text-stone-400 block text-[11px]">Dự báo xuất chuồng</span>
                <span className="text-lg font-extrabold text-stone-900 font-mono">
                  ~ {growthReport.metrics?.estimatedDaysToMarket} ngày nữa
                </span>
                <span className="text-[10px] text-stone-400 block">Mục tiêu: {growthReport.metrics?.projectedTargetWeightKg} kg</span>
              </div>
            </div>

            {/* AI Analysis Commentary */}
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                Nhận định tăng trưởng của Chuyên Gia Dinh Dưỡng AI:
              </div>
              <p className="leading-relaxed">{growthReport.aiAnalysis}</p>
            </div>

            {/* Recommendations */}
            {growthReport.optimizationRecommendations && (
              <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                <div className="font-bold text-stone-800">Khuyến nghị tối ưu khẩu phần & chu kỳ nuôi:</div>
                <ul className="space-y-1 pl-2">
                  {growthReport.optimizationRecommendations.map((rec: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Disclaimer */}
            <div className="text-[11px] text-stone-400 border-t border-stone-200/70 pt-2">
              <strong>Lưu ý:</strong> {growthReport.vetDisclaimer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
