import * as z from "zod/v4";

const requiredRuleNames = [
  "architecture",
  "testing",
  "naming",
  "coverage"
] as const;

const projectRulesSchema = z.object({
  architecture: z.string().trim().min(1),
  testing: z.string().trim().min(1),
  naming: z.string().trim().min(1),
  coverage: z.string().trim().min(1)
});

export const projectRulesInputSchema =
  projectRulesSchema.partial();

export type ProjectRules =
  z.infer<typeof projectRulesSchema>;

export type ProjectRulesValidation =
  | {
      valid: true;
      missing: [];
    }
  | {
      valid: false;
      missing: Array<
        (typeof requiredRuleNames)[number]
      >;
    };

export function validateProjectRules(
  input: unknown
): ProjectRulesValidation {

  const result = projectRulesSchema.safeParse(input);

  if (result.success) {
    return {
      valid: true,
      missing: []
    };
  }

  const candidate =
    typeof input === "object" &&
    input !== null &&
    !Array.isArray(input)
      ? input as Record<string, unknown>
      : {};

  const missing = requiredRuleNames.filter((rule) => {
    const value = candidate[rule];

    return typeof value !== "string" || value.trim() === "";
  });

  return {
    valid: false,
    missing
  };
}