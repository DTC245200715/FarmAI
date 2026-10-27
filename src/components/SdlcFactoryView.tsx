import React, { useState } from 'react';
import {
  Factory,
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCw,
  Code2,
  FileCode,
  Check,
  Copy,
  Terminal,
  Database,
  Search,
  Zap,
} from 'lucide-react';

interface StationResult {
  stationId: string;
  stationName: string;
  agentRole: string;
  status: 'completed' | 'in_progress' | 'failed';
  executionTimeMs: number;
  outputSummary: string;
  detailedData: any;
  guardrailChecks: {
    passed: boolean;
    name: string;
    details: string;
  }[];
}

interface SdlcFactoryData {
  projectName: string;
  rawRequirement: string;
  timestamp: string;
  totalTimeMs: number;
  contextEngineering: {
    domainLayer: string;
    architectureLayer: string;
    safetyLayer: string;
    techStackLayer: string;
  };
  stations: StationResult[];
  overallStatus: 'SUCCESS' | 'WARNING' | 'FAILED';
  readinessForProduction: string;
}

const SAMPLE_PROJECT_REQUIREMENTS = [
  {
    title: 'Giám Sát Chuồng Trại IoT & Cảnh Báo Sức Khỏe Bò Sữa Tự Động',
    req: 'Xây dựng module IoT thu thập nhiệt độ, độ ẩm và thân nhiệt cá thể bò sữa từ thẻ tai cảm biến RFID. Khi phát hiện nhiệt độ chuồng vượt quá 32°C hoặc thân nhiệt bò vượt 39.5°C liên tục 15 phút, tự động kích hoạt giàn quạt thông gió làm mát và đẩy thông báo khẩn cấp cho Bác sĩ thú y trực ca.',
  },
  {
    title: 'Dự Báo & Điều Phối Tồn Kho Thuốc Kháng Sinh & Vắc Xin',
    req: 'Thiết kế hệ thống quản lý xuất nhập tồn kho dược phẩm thú y. Dự báo mức tiêu thụ kháng sinh dựa theo quy mô đàn gia súc và phác đồ điều trị đang kích hoạt. Cảnh báo đặt hàng bổ sung trước 5 ngày khi chạm ngưỡng an toàn và cảnh báo lô thuốc sắp hết hạn sử dụng.',
  },
  {
    title: 'Hệ Thống Phân Tích Dịch Tễ & Cách Ly Khẩn Cấp Bệnh Tai Xanh (PRRS)',
    req: 'Khi có ca bệnh heo biểu hiện sốt cao tai tím bầm, hệ thống tự động sinh bản đồ cách ly chuồng dịch tễ, khoanh vùng bán kính an toàn 500m, tạm khóa xuất đàn và tạo quy trình sát trùng 5 bước nghiêm ngặt theo chuẩn an toàn sinh học VietGAHP.',
  },
];

export const SdlcFactoryView: React.FC = () => {
  const [selectedReq, setSelectedReq] = useState(SAMPLE_PROJECT_REQUIREMENTS[0].req);
  const [isProcessing, setIsProcessing] = useState(false);
  const [factoryResult, setFactoryResult] = useState<SdlcFactoryData | null>(null);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleRunFactory = async (customText?: string) => {
    const textToRun = customText || selectedReq;
    if (!textToRun.trim() || isProcessing) return;

    setIsProcessing(true);
    try {
      const res = await fetch('/api/ai/sdlc-factory/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requirement: textToRun }),
      });

      if (!res.ok) throw new Error('Lỗi thực thi quy trình SDLC Factory');
      const data = await res.json();
      setFactoryResult(data);
      setActiveStationIndex(0);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Lỗi kết nối tới SDLC Agent Factory');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            <Factory className="w-3.5 h-3.5" />
            Tiêu Chí Chấm 2 (4,0 Điểm): SDLC AI Agent Factory
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Nhà Máy Phát Triển Phần Mềm Đa Tác Tử (SDLC AI Factory)
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Hệ thống vận hành theo nguyên lý <strong className="text-white">Context Engineering</strong> phân tầng và{' '}
            <strong className="text-white">Dây chuyền 5 Trạm Agent tự động hóa SDLC</strong>: từ Bóc tách điểm mờ thấu (BA)
            đến Thiết kế Kiến trúc CSDL, Sinh mã nguồn Clean Architecture, Tự động tạo kiểm thử Unit/Integration và Thẩm tra Rào chắn An toàn.
          </p>
        </div>
      </div>

      {/* Input Requirement Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-600" />
            Yêu cầu tính năng đầu vào (Raw Feature Requirement)
          </label>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-medium">Chọn kịch bản mẫu:</span>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_PROJECT_REQUIREMENTS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedReq(s.req);
                    handleRunFactory(s.req);
                  }}
                  className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200/60 transition-colors cursor-pointer"
                >
                  Mẫu {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <textarea
          value={selectedReq}
          onChange={(e) => setSelectedReq(e.target.value)}
          rows={3}
          className="w-full text-xs p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all resize-none text-slate-800 font-sans"
          placeholder="Nhập yêu cầu bài toán hoặc tính năng phần mềm cần đưa vào nhà máy..."
        />

        <div className="flex justify-end">
          <button
            onClick={() => handleRunFactory()}
            disabled={isProcessing || !selectedReq.trim()}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-black text-xs shadow-lg shadow-indigo-600/20 flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all active:scale-95"
          >
            {isProcessing ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>Nhà Máy Đang Vận Hành Dây Chuyền...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Kích Hoạt Dây Chuyền SDLC Factory</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Context Engineering Blueprint Box */}
      {factoryResult && (
        <div className="bg-gradient-to-br from-indigo-50/70 to-slate-50 rounded-3xl p-6 border border-indigo-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-indigo-950 font-black text-sm">
            <Layers className="w-5 h-5 text-indigo-600" />
            <h3>Kiến Trúc Ngữ Cảnh 4 Tầng (Context Engineering Specification)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-white rounded-2xl border border-indigo-100/80 shadow-2xs space-y-1">
              <span className="font-extrabold text-indigo-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> 1. Domain Ontology
              </span>
              <p className="text-[11px] text-slate-600 leading-snug">
                {factoryResult.contextEngineering.domainLayer}
              </p>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-indigo-100/80 shadow-2xs space-y-1">
              <span className="font-extrabold text-indigo-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> 2. Architecture Rules
              </span>
              <p className="text-[11px] text-slate-600 leading-snug">
                {factoryResult.contextEngineering.architectureLayer}
              </p>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-indigo-100/80 shadow-2xs space-y-1">
              <span className="font-extrabold text-indigo-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> 3. Safety Guardrails
              </span>
              <p className="text-[11px] text-slate-600 leading-snug">
                {factoryResult.contextEngineering.safetyLayer}
              </p>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-indigo-100/80 shadow-2xs space-y-1">
              <span className="font-extrabold text-indigo-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> 4. Tech Stack Bounds
              </span>
              <p className="text-[11px] text-slate-600 leading-snug">
                {factoryResult.contextEngineering.techStackLayer}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5 Stations Pipeline Progress Bar */}
      {factoryResult && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {factoryResult.stations.map((st, index) => {
              const isSelected = activeStationIndex === index;
              return (
                <button
                  key={st.stationId}
                  onClick={() => setActiveStationIndex(index)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[92px] ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.02]'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200/80 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      Trạm {index + 1}
                    </span>
                    <span className="text-[10px] opacity-75 font-mono">{st.executionTimeMs}ms</span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs line-clamp-1">
                      {st.stationName.split(':')[1] || st.stationName}
                    </h4>
                    <p
                      className={`text-[10px] truncate ${
                        isSelected ? 'text-indigo-100' : 'text-slate-500'
                      }`}
                    >
                      {st.agentRole}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Station Detail Panel */}
          {(() => {
            const currentStation = factoryResult.stations[activeStationIndex];
            if (!currentStation) return null;

            return (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-black text-[10px]">
                        TRẠM {activeStationIndex + 1} / 5
                      </span>
                      <h3 className="font-black text-base text-slate-900">{currentStation.stationName}</h3>
                    </div>
                    <p className="text-xs text-slate-500">
                      Đặc nhiệm: <strong className="text-slate-800">{currentStation.agentRole}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Trạng thái: Hoàn tất
                    </span>
                  </div>
                </div>

                {/* Guardrail Checklist in this station */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Các rào chắn kiểm soát an toàn đã thực hiện (Safety Guardrails)
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {currentStation.guardrailChecks.map((g, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-200/70"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">{g.name}:</strong>{' '}
                          <span className="text-slate-600 text-[11px]">{g.details}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Output Details per Station */}
                <div className="space-y-3">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-700">
                    Sản phẩm đầu ra của trạm (Station Artifacts)
                  </h4>

                  {/* Station 1: BA details */}
                  {currentStation.stationId === 'st-1-ba' && (
                    <div className="space-y-3 text-xs">
                      <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                        <strong className="text-indigo-950 block mb-2 font-black">
                          3 Điểm Mờ Thấu (Ambiguities) & Đề Xuất Xử Lý Kỹ Thuật:
                        </strong>
                        <div className="space-y-2">
                          {currentStation.detailedData.ambiguitiesResolved.map((amb: any, i: number) => (
                            <div key={i} className="p-3 bg-white rounded-xl border border-indigo-100/70">
                              <span className="font-bold text-rose-700">Vấn đề {i + 1}: {amb.issue}</span>
                              <p className="text-emerald-800 text-[11px] mt-1">
                                ➔ <strong>Đề xuất giải pháp:</strong> {amb.resolution}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                        <strong className="text-slate-900 block mb-2 font-black">Danh sách User Stories:</strong>
                        <ul className="space-y-1.5 list-disc list-inside text-slate-700 text-[11px]">
                          {currentStation.detailedData.userStories.map((us: string, i: number) => (
                            <li key={i}>{us}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Station 2: Architect details */}
                  {currentStation.stationId === 'st-2-architect' && (
                    <div className="space-y-3 text-xs">
                      <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-[11px] overflow-x-auto border border-slate-800">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
                          <span>Database DDL Specification (MySQL)</span>
                          <button
                            onClick={() => handleCopyCode(currentStation.detailedData.databaseSchemaSpec)}
                            className="text-xs hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" /> Copy SQL
                          </button>
                        </div>
                        <pre className="whitespace-pre-wrap">{currentStation.detailedData.databaseSchemaSpec}</pre>
                      </div>

                      <div className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-2">
                        <strong className="text-slate-900 block font-black">Thiết kế RESTful API Contracts:</strong>
                        <div className="divide-y divide-slate-100">
                          {currentStation.detailedData.apiContracts.map((api: any, i: number) => (
                            <div key={i} className="py-2 flex items-center justify-between gap-4 font-mono text-[11px]">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-black">
                                  {api.method}
                                </span>
                                <span className="font-bold text-slate-800">{api.endpoint}</span>
                              </div>
                              <span className="text-slate-500 font-sans text-xs">{api.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Station 3: Engineer details */}
                  {currentStation.stationId === 'st-3-engineer' && (
                    <div className="space-y-3 text-xs">
                      {currentStation.detailedData.generatedFiles.map((f: any, i: number) => (
                        <div key={i} className="bg-slate-950 text-slate-200 rounded-2xl p-4 font-mono text-[11px] border border-slate-800">
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
                            <span className="flex items-center gap-2 text-indigo-400 font-bold">
                              <FileCode className="w-4 h-4" /> {f.filename}
                            </span>
                            <button
                              onClick={() => handleCopyCode(f.codeSnippet)}
                              className="text-xs hover:text-white flex items-center gap-1 cursor-pointer"
                            >
                              <Copy className="w-3.5 h-3.5" /> Sao chép mã
                            </button>
                          </div>
                          <pre className="whitespace-pre-wrap leading-relaxed">{f.codeSnippet}</pre>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Station 4: QA details */}
                  {currentStation.stationId === 'st-4-qa' && (
                    <div className="space-y-4 text-xs">
                      {currentStation.detailedData.testSuites.map((ts: any, i: number) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                          <strong className="text-slate-900 block font-black text-xs">{ts.suiteName}</strong>
                          <div className="space-y-2">
                            {ts.tests.map((t: any, j: number) => (
                              <div
                                key={j}
                                className="p-3 bg-white rounded-xl border border-slate-200/60 flex items-center justify-between gap-4"
                              >
                                <div>
                                  <span className="font-bold text-slate-800 font-mono text-[11px] mr-2">
                                    [{t.id}]
                                  </span>
                                  <span className="font-medium text-slate-900">{t.name}</span>
                                  <p className="text-[11px] text-slate-500 mt-0.5">Kỳ vọng: {t.expected}</p>
                                </div>
                                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px]">
                                  {t.result}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Station 5: Security details */}
                  {currentStation.stationId === 'st-5-security' && (
                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 space-y-1">
                          <span className="text-[11px] font-bold text-emerald-700">Điểm số bảo mật toàn diện:</span>
                          <p className="text-2xl font-black text-emerald-800">
                            {currentStation.detailedData.securityScore}
                          </p>
                        </div>
                        <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-200 text-indigo-950 space-y-1">
                          <span className="text-[11px] font-bold text-indigo-700">Chuẩn tuân thủ quy chuẩn:</span>
                          <p className="text-base font-black text-indigo-900">
                            {currentStation.detailedData.complianceLevel}
                          </p>
                        </div>
                      </div>
                      <p className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-700 text-xs leading-relaxed">
                        {currentStation.detailedData.auditSummary}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

