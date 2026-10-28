import React, { useState } from 'react';
import {
  Cpu,
  Search,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ShieldCheck,
  Zap,
  ArrowRight,
  Database,
  Layers,
  ChevronDown,
  ChevronUp,
  FileText,
  DollarSign,
  Package,
  Activity,
  Check,
  Copy,
  Info,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { apiClient } from '../services/apiClient';

export const MultiAgentView: React.FC = () => {
  const { addInventoryItem, addBatchTasks, setActiveTab } = useFarm();

  // Interactive consultation state
  const [queryInput, setQueryInput] = useState(
    'Tôi cần cám vỗ béo tăng trọng nhanh cho đàn bò thịt của hãng CP Việt Nam, ngân sách khoảng 400.000 đ'
  );
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionTrace, setExecutionTrace] = useState<any | null>(null);
  const [activeStageAccordion, setActiveStageAccordion] = useState<number | null>(4); // default open decision agent
  const [copiedJson, setCopiedJson] = useState(false);
  const [addInventorySuccess, setAddInventorySuccess] = useState(false);
  const [addTasksSuccess, setAddTasksSuccess] = useState(false);

  // Run interactive Multi-Agent consultation
  const handleExecuteConsultation = async (customQuery?: string) => {
    const q = customQuery || queryInput;
    if (!q.trim() || isExecuting) return;

    setIsExecuting(true);
    setAddInventorySuccess(false);
    setAddTasksSuccess(false);
    try {
      const data = await apiClient.post('/api/ai/multi-agent/run', { query: q }, { timeoutMs: 30000 });
      setExecutionTrace(data);
      setActiveStageAccordion(4); // auto-expand decision agent
    } catch (err: any) {
      alert(`Lỗi thực thi: ${err.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  // 1-Click Apply to Farm Inventory
  const handleImportToFarmInventory = () => {
    if (!executionTrace?.decisionAgent?.data?.recommendedProducts) return;

    const products = executionTrace.decisionAgent.data.recommendedProducts;
    let count = 0;
    products.forEach((item: any) => {
      const p = item.product;
      let mappedCat: any = 'Thức ăn';
      if (p.category === 'Thuốc & Vắc xin') mappedCat = 'Thuốc & Vắc xin';
      else if (p.category === 'Thực phẩm bổ sung') mappedCat = 'Thực phẩm bổ sung';
      else if (p.category === 'Vật tư & Sát trùng') mappedCat = 'Vật tư chuồng trại';

      addInventoryItem({
        name: p.name,
        category: mappedCat,
        quantity: 10,
        unit: p.unit || 'Lọ/Gói',
        minThreshold: 5,
        costPerUnit: p.priceVnd,
        supplier: p.brand,
      });
      count++;
    });

    setAddInventorySuccess(true);
    setTimeout(() => setAddInventorySuccess(false), 5000);
  };

  // 1-Click Schedule Protocol into Farm Tasks
  const handleScheduleProtocolTasks = () => {
    if (!executionTrace?.decisionAgent?.data?.clinicalProtocol) return;

    const protocols: string[] = executionTrace.decisionAgent.data.clinicalProtocol;
    const targetSpecies = executionTrace.requirementAgent.data.target_species || 'Gia súc';

    const today = new Date();
    const batch = protocols.map((stepText, idx) => {
      const d = new Date();
      d.setDate(today.getDate() + idx);
      const dateString = d.toISOString().split('T')[0];

      return {
        title: `[Multi-Agent] ${stepText.split(':')[0] || 'Phác đồ điều trị'} cho đàn ${targetSpecies}`,
        category: (idx === 1 ? 'Điều trị' : idx === 2 ? 'Cho ăn & Dinh dưỡng' : 'Kiểm tra sức khỏe') as any,
        dueDate: dateString,
        priority: (idx <= 1 ? 'Cao' : 'Trung bình') as any,
        status: 'pending' as const,
        notes: stepText,
        isAiGenerated: true,
      };
    });

    addBatchTasks(batch);
    setAddTasksSuccess(true);
    setTimeout(() => setAddTasksSuccess(false), 5000);
  };

  const copyJsonToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Overview */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-700/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Cpu className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span>Kiến Trúc Hệ Thống Đa Tác Tử Chuẩn Hóa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              Cố Vấn Nông Nghiệp & Thú Y Đa Tác Tử FarmPro
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Phối hợp tuần tự và tự sửa sai (Self-Healing) qua 4 tác tử chuyên biệt:
              <strong className="text-emerald-300"> Tác tử trích xuất yêu cầu (Requirement Agent)</strong> ➔
              <strong className="text-cyan-300"> Tác tử tra cứu an toàn & Ngữ nghĩa (Search & Vector Agent)</strong> ➔
              <strong className="text-amber-300"> Tác tử thẩm định & Cơ chế thử lại (Critic Agent)</strong> ➔
              <strong className="text-emerald-400"> Tác tử quyết định phác đồ & Báo giá (Decision Agent)</strong>.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center">
              <div className="text-xs text-slate-300">Tác tử phối hợp</div>
              <div className="text-xl font-bold text-emerald-300">4 Tác Tử</div>
              <div className="text-[10px] text-slate-400">Tuần tự & Độc lập</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center">
              <div className="text-xs text-slate-300">Bảo mật truy vấn SQL</div>
              <div className="text-xl font-bold text-cyan-300">An Toàn 100%</div>
              <div className="text-[10px] text-slate-400">Tham số hóa an toàn</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center col-span-2 sm:col-span-1">
              <div className="text-xs text-slate-300">Chuẩn hóa dữ liệu</div>
              <div className="text-xl font-bold text-amber-300">VietGAHP</div>
              <div className="text-[10px] text-slate-400">Tự phục hồi đa tầng</div>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS ALERTS */}
      {addInventorySuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl p-4 flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-sm font-medium">
              Đã nhập thành công các sản phẩm đề xuất vào <strong>Kho Vật Tư FarmPro</strong>!
            </span>
          </div>
          <button
            onClick={() => setActiveTab('inventory')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1"
          >
            Xem kho vật tư <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      )}

      {addTasksSuccess && (
        <div className="bg-blue-50 border border-blue-300 text-blue-900 rounded-xl p-4 flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
            <span className="text-sm font-medium">
              Đã thêm phác đồ chăm sóc 4 bước vào <strong>Lịch Trình & Công Việc</strong> trang trại!
            </span>
          </div>
          <button
            onClick={() => setActiveTab('schedule')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline flex items-center gap-1"
          >
            Xem lịch công việc <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* CONSULTATION VIEW */}
      <div className="space-y-6">
        {/* Query Input Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Nhập yêu cầu tư vấn dinh dưỡng & thú y:
            </label>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Hỗ trợ ngôn ngữ tự nhiên, ngân sách, hãng sản xuất, triệu chứng lâm sàng
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleExecuteConsultation()}
              placeholder="VD: Cần kháng sinh tiêm cho heo sốt thở giật bụng của Marphavet, ngân sách 200k..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
            />
            <button
              onClick={() => handleExecuteConsultation()}
              disabled={isExecuting || !queryInput.trim()}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition shrink-0"
            >
              {isExecuting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Đang chạy 4 Agents...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Thực Thi Đa Tác Tử
                </>
              )}
            </button>
          </div>
        </div>

          {/* Execution Pipeline Visualization */}
          {executionTrace && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-1">
                <div>
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-emerald-600" />
                    Quy Trình Thực Thi Đa Tác Tử (Execution Trace)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Mã yêu cầu: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">{executionTrace.requestId}</code> •
                    Tổng thời gian xử lý: <strong className="text-emerald-700">{executionTrace.totalExecutionTimeMs}ms</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleImportToFarmInventory}
                    className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                  >
                    <Package className="w-3.5 h-3.5" />
                    Nhập vào Kho FarmPro
                  </button>
                  <button
                    onClick={handleScheduleProtocolTasks}
                    className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                  >
                    <Activity className="w-3.5 h-3.5" />
                    Lên Lịch Công Việc
                  </button>
                </div>
              </div>

              {/* 4 Agent Stepper Cards */}
              <div className="space-y-3">
                {/* ---------------- AGENT 1: REQUIREMENT AGENT ---------------- */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <div
                    onClick={() => setActiveStageAccordion(activeStageAccordion === 1 ? null : 1)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 select-none transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">
                        1
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                          🎯 Agent 1: Requirement Agent (Trích Xuất Nhu Cầu JSON)
                          <span className="text-[11px] px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md font-medium border border-emerald-200">
                            Trích xuất chuẩn hóa JSON
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">
                          Nhận diện: Loài{' '}
                          <strong className="text-slate-800">{executionTrace.requirementAgent.data.target_species}</strong> •
                          Hãng{' '}
                          <strong className="text-slate-800">
                            {executionTrace.requirementAgent.data.brand_preference || 'Không chỉ định'}
                          </strong>{' '}
                          • Ngân sách{' '}
                          <strong className="text-slate-800">
                            {executionTrace.requirementAgent.data.budget_vnd
                              ? `${executionTrace.requirementAgent.data.budget_vnd.toLocaleString('vi-VN')} đ`
                              : 'Tự do'}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 font-mono">
                        {executionTrace.requirementAgent.timeMs}ms
                      </span>
                      {activeStageAccordion === 1 ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {activeStageAccordion === 1 && (
                    <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                          <div className="text-slate-400 text-[10px]">Intent (Ý định)</div>
                          <div className="font-semibold text-slate-800 capitalize">
                            {executionTrace.requirementAgent.data.intent}
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                          <div className="text-slate-400 text-[10px]">Target Species (Loài)</div>
                          <div className="font-semibold text-emerald-700">
                            {executionTrace.requirementAgent.data.target_species}
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                          <div className="text-slate-400 text-[10px]">Brand (Hãng yêu cầu)</div>
                          <div className="font-semibold text-slate-800">
                            {executionTrace.requirementAgent.data.brand_preference || 'None'}
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                          <div className="text-slate-400 text-[10px]">Urgency & Confidence</div>
                          <div className="font-semibold text-amber-600">
                            {executionTrace.requirementAgent.data.urgency} (
                            {(executionTrace.requirementAgent.data.confidence_score * 100).toFixed(0)}%)
                          </div>
                        </div>
                      </div>

                      {/* Raw JSON Schema display */}
                      <div className="relative">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1">
                          <span>Dữ liệu cấu trúc JSON (Requirement Agent Output):</span>
                          <button
                            onClick={() =>
                              copyJsonToClipboard(JSON.stringify(executionTrace.requirementAgent.data, null, 2))
                            }
                            className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                          >
                            {copiedJson ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copiedJson ? 'Đã sao chép' : 'Sao chép JSON'}
                          </button>
                        </div>
                        <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-lg overflow-x-auto border border-slate-800">
                          {JSON.stringify(executionTrace.requirementAgent.data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>

                {/* ---------------- AGENT 2: SEARCH & RETRIEVAL AGENT ---------------- */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <div
                    onClick={() => setActiveStageAccordion(activeStageAccordion === 2 ? null : 2)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 select-none transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-800 font-bold flex items-center justify-center text-sm">
                        2
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                          🔍 Agent 2: Search & Retrieval Agent (Safe SQL & Vector Semantic Search)
                          <span className="text-[11px] px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded-md font-medium border border-cyan-200">
                            Truy vấn an toàn & Ngữ nghĩa
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                          <span>
                            Đã quét {executionTrace.searchAgent.data.semanticVectorHits?.length || 0} ứng viên qua Vector Search
                          </span>
                          •
                          <span className="text-emerald-700 font-medium">
                            {executionTrace.searchAgent.data.isSafeParameterized ? 'SQL Parameterized An Toàn' : ''}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 font-mono">{executionTrace.searchAgent.timeMs}ms</span>
                      {activeStageAccordion === 2 ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {activeStageAccordion === 2 && (
                    <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-4">
                      {/* Safety Badges: SQL Injection & Brand / Budget Handling */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* SQL Injection Protection Badge */}
                        <div
                          className={`p-3 rounded-lg border text-xs ${
                            executionTrace.searchAgent.data.sqlInjectionDetected
                              ? 'bg-amber-50 border-amber-300 text-amber-900'
                              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          }`}
                        >
                          <div className="font-semibold flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            Bảo vệ truy vấn SQL
                          </div>
                          <div className="mt-1 text-[11px]">
                            {executionTrace.searchAgent.data.sqlInjectionDetected
                              ? '⚠️ Phát hiện mẫu ký tự bất thường! Đã kích hoạt cơ chế khử khuẩn tham số hóa an toàn.'
                              : '✅ Truy vấn tham số hóa hoàn toàn an toàn (:species, :category). Ngăn chặn 100% rò rỉ dữ liệu.'}
                          </div>
                        </div>

                        {/* Brand Handling Badge */}
                        <div
                          className={`p-3 rounded-lg border text-xs ${
                            !executionTrace.searchAgent.data.brandStatus.isBrandFound
                              ? 'bg-orange-50 border-orange-300 text-orange-900'
                              : 'bg-slate-100 border-slate-200 text-slate-800'
                          }`}
                        >
                          <div className="font-semibold flex items-center gap-1.5">
                            <Info className="w-4 h-4 text-blue-600" />
                            Xác thực Thương hiệu & Hãng
                          </div>
                          <div className="mt-1 text-[11px]">
                            {executionTrace.searchAgent.data.brandStatus.isBrandFound
                              ? `Hãng hợp lệ: ${executionTrace.searchAgent.data.brandStatus.requestedBrand || 'Toàn hệ thống'}`
                              : executionTrace.searchAgent.data.brandStatus.brandAlternativeNotice}
                          </div>
                        </div>

                        {/* Budget Handling Badge */}
                        <div
                          className={`p-3 rounded-lg border text-xs ${
                            !executionTrace.searchAgent.data.budgetStatus.isBudgetSufficient
                              ? 'bg-yellow-50 border-yellow-300 text-yellow-900'
                              : 'bg-slate-100 border-slate-200 text-slate-800'
                          }`}
                        >
                          <div className="font-semibold flex items-center gap-1.5">
                            <DollarSign className="w-4 h-4 text-emerald-600" />
                            Tối ưu hóa Ràng buộc Ngân sách
                          </div>
                          <div className="mt-1 text-[11px]">
                            {executionTrace.searchAgent.data.budgetStatus.isBudgetSufficient
                              ? 'Ngân sách đáp ứng tốt mức giá các sản phẩm.'
                              : executionTrace.searchAgent.data.budgetStatus.budgetWarningNotice}
                          </div>
                        </div>
                      </div>

                      {/* Parameterized SQL Statement Display */}
                      <div>
                        <div className="text-[11px] font-semibold text-slate-500 mb-1">
                          Câu lệnh Parameterized SQL (Safe Execution):
                        </div>
                        <pre className="p-3 bg-slate-900 text-cyan-400 font-mono text-xs rounded-lg overflow-x-auto border border-slate-800">
                          {executionTrace.searchAgent.data.querySql}
                        </pre>
                      </div>

                      {/* Vector Semantic Search Ranking Table */}
                      <div>
                        <div className="text-[11px] font-semibold text-slate-500 mb-1">
                          Bảng xếp hạng Vector Semantic Search (Độ tương đồng ngữ nghĩa):
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                          <table className="w-full text-xs">
                            <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                              <tr>
                                <th className="text-left p-2.5">Sản phẩm</th>
                                <th className="text-left p-2.5">Hãng</th>
                                <th className="text-left p-2.5">Giá niêm yết</th>
                                <th className="text-left p-2.5">Điểm tương đồng (Similarity)</th>
                                <th className="text-left p-2.5">Lý do khớp</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {executionTrace.searchAgent.data.semanticVectorHits?.map(
                                (hit: any, idx: number) => (
                                  <tr key={idx} className="hover:bg-slate-50">
                                    <td className="p-2.5 font-medium text-slate-800">{hit.product.name}</td>
                                    <td className="p-2.5 text-slate-600">{hit.product.brand}</td>
                                    <td className="p-2.5 font-mono text-emerald-700">
                                      {hit.product.priceVnd.toLocaleString('vi-VN')} đ
                                    </td>
                                    <td className="p-2.5">
                                      <div className="flex items-center gap-2">
                                        <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden">
                                          <div
                                            className="bg-cyan-600 h-2 rounded-full"
                                            style={{ width: `${hit.similarityScore * 100}%` }}
                                          />
                                        </div>
                                        <span className="font-bold text-cyan-800">
                                          {(hit.similarityScore * 100).toFixed(0)}%
                                        </span>
                                      </div>
                                    </td>
                                    <td className="p-2.5 text-slate-500 text-[11px]">{hit.matchReason}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ---------------- AGENT 3: CRITIC & EVALUATION AGENT ---------------- */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <div
                    onClick={() => setActiveStageAccordion(activeStageAccordion === 3 ? null : 3)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 select-none transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-sm">
                        3
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                          ⚖️ Agent 3: Critic & Evaluation Agent (Kiểm Định & Cơ Chế Retry)
                          <span className="text-[11px] px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md font-medium border border-amber-200">
                            Tự động Thẩm định & Phục hồi
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <span>
                            Điểm đánh giá:{' '}
                            <strong className="text-emerald-700 font-bold">
                              {executionTrace.criticAgent.data.score}/100
                            </strong>
                          </span>
                          •
                          <span
                            className={
                              executionTrace.criticAgent.data.retryCount > 0 ? 'text-amber-700 font-semibold' : 'text-slate-600'
                            }
                          >
                            Số lần Retry:{' '}
                            {executionTrace.criticAgent.data.retryCount > 0
                              ? `${executionTrace.criticAgent.data.retryCount} lần (Tự phục hồi thành công)`
                              : '0 lần (Thành công ngay)'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 font-mono">{executionTrace.criticAgent.timeMs}ms</span>
                      {activeStageAccordion === 3 ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {activeStageAccordion === 3 && (
                    <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
                      {/* Retry notes if triggered */}
                      {executionTrace.criticAgent.data.retryCount > 0 && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-1">
                          <div className="font-bold flex items-center gap-1.5 text-amber-800">
                            <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
                            Đã kích hoạt cơ chế Tự phục hồi (Self-Healing Retry):
                          </div>
                          <ul className="list-disc pl-5 space-y-0.5 text-[11px]">
                            {executionTrace.criticAgent.data.relaxationApplied.map((note: string, i: number) => (
                              <li key={i}>{note}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Criteria Checklist */}
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-semibold text-slate-500">
                          Bảng kiểm định 5 tiêu chí độc lập (Validation Criteria):
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {executionTrace.criticAgent.data.validationChecks?.map((check: any, idx: number) => (
                            <div
                              key={idx}
                              className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                                check.passed
                                  ? 'bg-white border-slate-200 text-slate-800'
                                  : 'bg-red-50 border-red-200 text-red-900'
                              }`}
                            >
                              {check.passed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                              )}
                              <div>
                                <div className="font-semibold text-slate-800">{check.criterion}</div>
                                <div className="text-slate-500 text-[11px]">{check.detail}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ---------------- AGENT 4: DECISION & ADVISOR AGENT ---------------- */}
                <div className="bg-white rounded-xl border border-emerald-300 shadow-md overflow-hidden">
                  <div
                    onClick={() => setActiveStageAccordion(activeStageAccordion === 4 ? null : 4)}
                    className="p-4 flex items-center justify-between cursor-pointer bg-emerald-50/50 hover:bg-emerald-50 select-none transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow">
                        4
                      </div>
                      <div>
                        <div className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                          🩺 Agent 4: Decision & Advisor Agent (Tổng Hợp Quyết Định & Phác Đồ)
                          <span className="text-[11px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-medium border border-emerald-300">
                            Phác đồ chuẩn hóa VietGAHP
                          </span>
                        </div>
                        <div className="text-xs text-emerald-800">
                          {executionTrace.decisionAgent.data.recommendedProducts.length} sản phẩm chỉ định • Tổng chi
                          phí dự kiến:{' '}
                          <strong className="text-emerald-900 font-bold">
                            {executionTrace.decisionAgent.data.totalCostVnd.toLocaleString('vi-VN')} đ
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 font-mono">{executionTrace.decisionAgent.timeMs}ms</span>
                      {activeStageAccordion === 4 ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {activeStageAccordion === 4 && (
                    <div className="p-5 space-y-5 border-t border-emerald-100 bg-white">
                      {/* Summary Banner */}
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-950 leading-relaxed">
                        <div className="font-bold text-emerald-900 mb-1 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Kết Luận Cố Vấn Chuyên Sâu:
                        </div>
                        {executionTrace.decisionAgent.data.summary}
                      </div>

                      {/* Recommended Products Grid */}
                      <div>
                        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                          Sản phẩm đề xuất & Lý giải lựa chọn (Justification):
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {executionTrace.decisionAgent.data.recommendedProducts.map((item: any, idx: number) => (
                            <div
                              key={idx}
                              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition shadow-sm space-y-2"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                    {item.product.brand}
                                  </span>
                                  <h4 className="text-sm font-bold text-slate-900 mt-1">{item.product.name}</h4>
                                </div>
                                <div className="text-right shrink-0">
                                  <div className="text-sm font-bold text-emerald-700 font-mono">
                                    {item.product.priceVnd.toLocaleString('vi-VN')} đ
                                  </div>
                                  <div className="text-[10px] text-slate-400">{item.product.unit}</div>
                                </div>
                              </div>

                              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                <strong>Lý giải chuyên môn:</strong> {item.recommendationReason}
                              </p>

                              <div className="text-xs text-slate-700 flex items-start gap-1.5 pt-1">
                                <span className="font-semibold text-emerald-800 shrink-0">Liều dùng:</span>
                                <span>{item.dosageGuide}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 4-step Clinical Protocol */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                          <Activity className="w-4 h-4 text-emerald-600" />
                          Phác đồ hành động chuẩn thú y trang trại (4 Bước):
                        </div>
                        <div className="space-y-2 text-xs text-slate-700">
                          {executionTrace.decisionAgent.data.clinicalProtocol.map((step: string, i: number) => (
                            <div key={i} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Safety & Withdrawal Warnings */}
                      <div className="space-y-1.5 text-xs text-amber-900 bg-amber-50/80 p-3 rounded-xl border border-amber-200">
                        <div className="font-bold text-amber-800 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          Cảnh báo an toàn & Thời gian ngừng thuốc (Withdrawal period):
                        </div>
                        {executionTrace.decisionAgent.data.safetyWarnings.map((warn: string, i: number) => (
                          <div key={i} className="text-[11px] leading-relaxed">
                            {warn}
                          </div>
                        ))}
                      </div>

                      {/* Bottom Action Bar */}
                      <div className="pt-2 flex flex-wrap items-center justify-end gap-3 border-t border-slate-100">
                        <button
                          onClick={handleImportToFarmInventory}
                          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow flex items-center gap-2 transition"
                        >
                          <Package className="w-4 h-4" />
                          1-Chạm Nhập Sản Phẩm Vào Kho FarmPro
                        </button>
                        <button
                          onClick={handleScheduleProtocolTasks}
                          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow flex items-center gap-2 transition"
                        >
                          <Activity className="w-4 h-4" />
                          1-Chạm Tạo Lịch Công Việc Trang Trại
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};
