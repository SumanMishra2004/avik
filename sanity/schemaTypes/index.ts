import { heroStat } from "./objects/heroStat";
import { ctaButton } from "./objects/ctaButton";
import { socialLink } from "./objects/socialLink";
import { publicationsStatsSchema } from "./objects/publicationsStats";

import { siteSettings } from "./documents/siteSettings";
import { experience } from "./documents/experience";
import { education } from "./documents/education";
import { award } from "./documents/award";
import { researchInterest } from "./documents/researchInterest";
import { skill } from "./documents/skill";
import { navLink } from "./documents/navLink";
import { teamMember } from "./documents/teamMember";
import { project } from "./documents/project";
import { publication } from "./documents/publication";

export const schemaTypes = [
  // Objects
  heroStat,
  ctaButton,
  socialLink,
  publicationsStatsSchema,
  // Documents
  siteSettings,
  experience,
  education,
  award,
  researchInterest,
  skill,
  navLink,
  teamMember,
  project,
  publication,
];
