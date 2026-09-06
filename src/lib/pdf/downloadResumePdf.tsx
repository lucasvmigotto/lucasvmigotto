import type { ResumeJson } from "@/types/resume";

export async function downloadResumePdf(resume: ResumeJson, locale: string): Promise<void> {
  const { pdf } = await import("@react-pdf/renderer");
  const { ResumeDocument } = await import("./ResumeDocument");
  const blob = await pdf(<ResumeDocument resume={resume} locale={locale} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `lucas-vidor-migotto-cv-${locale}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
