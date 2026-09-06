import { describe, expect, test } from "bun:test";
import { render } from "@testing-library/react";
import { CertBadge } from "@/components/CertBadge";
import type { Certification } from "@/types/resume";

const cert: Certification = {
  name: "AWS Cloud Practitioner",
  issuer: "AWS",
  issuerSvg: "/assets/certs/aws.svg",
  date: "2023-08",
  url: "https://www.credly.com/x",
};

describe("CertBadge", () => {
  test("renders cert name and issuer", () => {
    const { getByText } = render(<CertBadge cert={cert} />);
    expect(getByText("AWS Cloud Practitioner")).toBeTruthy();
    expect(getByText("AWS")).toBeTruthy();
  });

  test("links to cert url with target blank", () => {
    const { getByRole } = render(<CertBadge cert={cert} />);
    const link = getByRole("link");
    expect(link.getAttribute("href")).toBe(cert.url);
    expect(link.getAttribute("target")).toBe("_blank");
  });
});
