import { describe, expect, it } from "vitest";
import { validateProjectRules } from "./project-rules";

const completeRules = {
  architecture: "Clean Architecture",
  testing: "AAA Pattern",
  naming: "PascalCase",
  coverage: "80%",
  dependencies:"None"
};

describe("Project Rules Validator", () => {

  it("should accept complete project rules", () => {
    expect(validateProjectRules(completeRules)).toEqual({
      valid: true,
      missing: []
    });
  });

  it("should detect missing architecture rules", () => {
    const rules = {
      testing: "AAA Pattern",
      naming: "PascalCase",
      coverage: "80%"
    };

    expect(validateProjectRules(rules)).toEqual({
      valid: false,
      missing: ["architecture"]
    });
  });

  it("should reject empty rules", () => {
    const rules = {
      ...completeRules,
      testing: "   "
    };

    expect(validateProjectRules(rules)).toEqual({
      valid: false,
      missing: ["testing"]
    });
  });

  it("should reject null input", () => {
    expect(validateProjectRules(null)).toEqual({
      valid: false,
      missing: [
        "architecture",
        "testing",
        "naming",
        "coverage"
      ]
    });
  });
});