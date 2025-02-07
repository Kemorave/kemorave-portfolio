import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KemoraveDataService {
  public static readonly journeyStartDate: Date = new Date(
    2019,
    2,
    18,
    6,
    0,
    0,
    0
  );

  wizardLevels: WizardLevel[] = [
    {
      title: 'Apprentice Coder 🧹',
      level: 'Intern / Junior',
      description:
        'Still figuring out the magic of console.log(). Occasionally turns coffee into null.',
    },
    {
      title: 'Novice Spellcaster 🔮',
      level: 'Junior Developer',
      description:
        'Can cast basic spells like for loops and if statements but often forgets a semicolon.',
    },
    {
      title: 'Code Conjurer 📜',
      level: 'Mid-Level Developer',
      description:
        'Can summon APIs and databases, but sometimes accidentally creates infinite loops (portals to another realm).',
    },
    {
      title: 'Senior Sorcerer 🧙‍♂️',
      level: 'Senior Developer',
      description:
        "Writes code so powerful it’s unreadable to mortals. Leaves cryptic comments like 'Refactor later?'",
    },
    {
      title: 'Archmage of Engineering 🏰',
      level: 'Staff Engineer',
      description:
        'Master of patterns and architectures. Speaks in arcane languages like Haskell and Rust.',
    },
    {
      title: 'Elder Code Sage 📖',
      level: 'Principal Engineer',
      description:
        'Guides younger wizards. Writes docs so complex that reading them requires a quest.',
    },
    {
      title: 'Grand Architect of the Cloud ☁️',
      level: 'CTO / Distinguished Engineer',
      description:
        'Weaves entire cloud kingdoms. Has transcended coding and now speaks in diagrams and spreadsheets.',
    },
  ];

  // Function to get wizard level based on experience
  getWizardLevel(yearsOfExperience: number) {
    if (yearsOfExperience < 1) return this.wizardLevels[0]; // Intern / Junior
    if (yearsOfExperience < 3) return this.wizardLevels[1]; // Junior
    if (yearsOfExperience < 6) return this.wizardLevels[2]; // Mid-Level
    if (yearsOfExperience < 10) return this.wizardLevels[3]; // Senior
    if (yearsOfExperience < 15) return this.wizardLevels[4]; // Staff Engineer
    if (yearsOfExperience < 20) return this.wizardLevels[5]; // Principal
    return this.wizardLevels[6]; // CTO / Distinguished
  }
  // Function to calculate years of experience
  getYearsOfExperience(startDate: Date) {
    const now = new Date();
    const diffInMilliseconds = now.getTime() - startDate.getTime();
    return Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
  }
  getMyLevel() {
    const now = new Date();
    const years = this.getYearsOfExperience(
      KemoraveDataService.journeyStartDate
    );

    return {years,level:this.getWizardLevel(years)};
  }
}
export interface WizardLevel {
  title: string;
  level: string;
  description: string;
  image?: string;
}