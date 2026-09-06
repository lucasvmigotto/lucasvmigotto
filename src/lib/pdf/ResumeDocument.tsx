import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { formatPeriod } from "@/lib/formatPeriod";
import type { ResumeJson } from "@/types/resume";
import { buildResumeData } from "./resumeData";

const GOLD = "#D4A843";
const ACCENT = "#5B6EF5";
const INK = "#16213A";
const MUTED = "#4A5878";

const BASE_URL = import.meta.env["BASE_URL"];

Font.register({
  family: "Space Grotesk",
  fonts: [
    {
      src: `${BASE_URL}assets/fonts/SpaceGrotesk-500.ttf`,
      fontWeight: 500,
    },
    {
      src: `${BASE_URL}assets/fonts/SpaceGrotesk-700.ttf`,
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: "Inter",
  fonts: [
    {
      src: `${BASE_URL}assets/fonts/Inter-400.ttf`,
      fontWeight: 400,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingTop: 44,
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.5,
    color: INK,
  },
  header: {
    borderBottom: `2px solid ${ACCENT}`,
    paddingBottom: 14,
    marginBottom: 18,
  },
  name: {
    fontFamily: "Space Grotesk",
    fontWeight: 700,
    fontSize: 26,
    color: INK,
    paddingBottom: 20,
  },
  title: {
    fontFamily: "Space Grotesk",
    fontWeight: 500,
    fontSize: 12,
    color: MUTED,
    marginTop: 2,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
    fontSize: 9,
    color: MUTED,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontFamily: "Space Grotesk",
    fontWeight: 700,
    fontSize: 13,
    color: ACCENT,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  objective: {
    fontSize: 10,
    lineHeight: 1.55,
    color: INK,
  },
  experience: {
    marginBottom: 12,
  },
  companyLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  company: {
    fontFamily: "Space Grotesk",
    fontWeight: 700,
    fontSize: 11.5,
    color: INK,
  },
  location: {
    fontSize: 9,
    color: MUTED,
  },
  role: {
    fontFamily: "Space Grotesk",
    fontWeight: 500,
    fontSize: 10.5,
    color: INK,
    marginTop: 4,
  },
  roleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  period: {
    fontSize: 9,
    color: MUTED,
  },
  current: {
    color: GOLD,
    fontWeight: 500,
  },
  bullets: {
    marginTop: 3,
    paddingLeft: 12,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bulletDot: {
    width: 10,
    color: ACCENT,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.45,
    color: INK,
  },
  twoCol: {
    flexDirection: "row",
    gap: 12,
  },
  col: {
    flex: 1,
  },
  skill: {
    marginBottom: 6,
  },
  skillCat: {
    fontFamily: "Space Grotesk",
    fontWeight: 700,
    fontSize: 9.5,
    color: INK,
  },
  skillItems: {
    fontSize: 9,
    color: MUTED,
    marginTop: 1,
  },
});

interface ResumeDocumentProps {
  resume: ResumeJson;
  locale: string;
}

export function ResumeDocument({ resume, locale }: ResumeDocumentProps) {
  const data = buildResumeData(resume, (start, end) => formatPeriod(start, end, locale));

  return (
    <Document title={data.name} author={data.name}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.contactRow}>
            <Text>{data.email}</Text>
            <Text>•</Text>
            <Text>{data.whatsappUsername}</Text>
            <Text>•</Text>
            <Text>{data.location}</Text>
            <Text>•</Text>
            <Text>{data.github}</Text>
            <Text>•</Text>
            <Text>{data.linkedin}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.objective}>{data.objective}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp) => (
            <View key={exp.company} style={styles.experience} wrap={false}>
              <View style={styles.companyLine}>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.location}>{exp.location}</Text>
              </View>
              {exp.roles.map((role) => (
                <View key={`${exp.company}-${role.title}`} style={{ marginTop: 6 }}>
                  <View style={styles.roleHeader}>
                    <Text style={styles.role}>{role.title}</Text>
                    <Text style={[styles.period, role.current ? styles.current : undefined]}>
                      {role.periodLabel}
                    </Text>
                  </View>
                  <View style={styles.bullets}>
                    {role.bullets.map((b) => (
                      <View key={b} style={styles.bullet}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{b}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.twoCol}>
            <View style={styles.col}>
              {data.skills.slice(0, 2).map((s) => (
                <View key={s.category} style={styles.skill}>
                  <Text style={styles.skillCat}>{s.category}</Text>
                  <Text style={styles.skillItems}>{s.items}</Text>
                </View>
              ))}
            </View>
            <View style={styles.col}>
              {data.skills.slice(2).map((s) => (
                <View key={s.category} style={styles.skill}>
                  <Text style={styles.skillCat}>{s.category}</Text>
                  <Text style={styles.skillItems}>{s.items}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {data.certifications.map((c) => (
            <View key={c.name} style={styles.bullet}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                {c.name} — {c.issuer} ({c.date})
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((e) => (
            <View key={e.degree} style={styles.experience} wrap={false}>
              <View style={styles.roleHeader}>
                <Text style={styles.role}>{e.degree}</Text>
                <Text style={styles.period}>{e.periodLabel}</Text>
              </View>
              <Text style={styles.skillItems}>{e.institution}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <Text style={styles.objective}>
            {data.languages.map((l) => `${l.language} (${l.level})`).join("  ·  ")}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
