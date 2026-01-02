// COMPLETE CONVICTION CATEGORIES FOR FRIEND A FELON PLATFORM

export const convictionCategories = {
  violent: {
    name: 'Violent Crimes',
    color: 'red',
    crimes: [
      'Assault',
      'Aggravated Assault',
      'Battery',
      'Domestic Violence',
      'Robbery',
      'Armed Robbery',
      'Homicide',
      'Murder',
      'Attempted Murder',
      'Manslaughter',
      'Voluntary Manslaughter',
      'Involuntary Manslaughter',
      'Kidnapping',
      'Abduction',
      'Carjacking',
      'Armed Carjacking',
      'Mayhem',
      'Torture',
      'Aggravated Battery',
      'Assault with Deadly Weapon',
      'Terroristic Threats',
      'Gang-Related Violence',
      'Drive-By Shooting',
      'Vehicular Homicide'
    ]
  },
  
  sexOffenses: {
    name: 'Sex Offenses',
    color: 'purple',
    crimes: [
      'Sexual Assault',
      'Rape',
      'Statutory Rape',
      'Child Molestation',
      'Child Abuse (Sexual)',
      'Indecent Exposure',
      'Lewd Conduct',
      'Possession of Child Pornography',
      'Distribution of Child Pornography',
      'Sex Trafficking',
      'Human Trafficking (Sexual)',
      'Prostitution',
      'Solicitation',
      'Pimping',
      'Pandering',
      'Sexual Battery',
      'Criminal Sexual Conduct',
      'Failure to Register (Sex Offender)',
      'Voyeurism',
      'Sexual Exploitation of a Minor'
    ]
  },
  
  property: {
    name: 'Property Crimes',
    color: 'orange',
    crimes: [
      'Burglary',
      'Breaking and Entering',
      'Theft',
      'Grand Theft',
      'Petty Theft',
      'Grand Larceny',
      'Petit Larceny',
      'Auto Theft',
      'Shoplifting',
      'Receiving Stolen Property',
      'Possession of Stolen Property',
      'Criminal Trespass',
      'Vandalism',
      'Criminal Damage to Property',
      'Arson',
      'Criminal Mischief',
      'Identity Theft',
      'Credit Card Fraud',
      'Check Fraud',
      'Forgery',
      'Counterfeiting',
      'Extortion',
      'Blackmail'
    ]
  },
  
  drug: {
    name: 'Drug Crimes',
    color: 'green',
    crimes: [
      'Drug Possession',
      'Possession of Marijuana',
      'Possession of Cocaine',
      'Possession of Heroin',
      'Possession of Methamphetamine',
      'Possession of Fentanyl',
      'Possession of Prescription Drugs',
      'Drug Trafficking',
      'Drug Distribution',
      'Drug Manufacturing',
      'Cultivation of Marijuana',
      'Possession with Intent to Distribute',
      'Drug Conspiracy',
      'Drug Paraphernalia',
      'Maintaining a Drug House',
      'Operating a Drug Lab',
      'Importation of Drugs',
      'Smuggling',
      'Sale to a Minor',
      'Drug Trafficking Near School'
    ]
  },
  
  federal: {
    name: 'Federal Crimes',
    color: 'blue',
    crimes: [
      'Wire Fraud',
      'Mail Fraud',
      'Bank Fraud',
      'Tax Evasion',
      'Tax Fraud',
      'Securities Fraud',
      'Insurance Fraud',
      'Healthcare Fraud',
      'Medicare Fraud',
      'RICO Violations',
      'Money Laundering',
      'Conspiracy',
      'Federal Drug Charges',
      'Federal Weapons Charges',
      'Interstate Commerce Violations',
      'Federal Embezzlement',
      'Counterfeiting (Federal)',
      'Copyright Infringement',
      'Trademark Violations',
      'Immigration Fraud',
      'Passport Fraud',
      'Federal Identity Theft'
    ]
  },
  
  whiteCollar: {
    name: 'White Collar Crimes',
    color: 'indigo',
    crimes: [
      'Embezzlement',
      'Fraud',
      'Wire Fraud',
      'Mail Fraud',
      'Bank Fraud',
      'Credit Card Fraud',
      'Insurance Fraud',
      'Securities Fraud',
      'Investment Fraud',
      'Ponzi Scheme',
      'Pyramid Scheme',
      'Insider Trading',
      'Market Manipulation',
      'Corporate Fraud',
      'Accounting Fraud',
      'Bribery',
      'Kickbacks',
      'Corruption',
      'Public Corruption',
      'Tax Evasion',
      'Money Laundering',
      'Racketeering',
      'Antitrust Violations'
    ]
  },
  
  weapons: {
    name: 'Weapons Crimes',
    color: 'yellow',
    crimes: [
      'Illegal Possession of Firearm',
      'Felon in Possession of Firearm',
      'Carrying Concealed Weapon',
      'Weapons Trafficking',
      'Possession of Illegal Weapon',
      'Assault with Deadly Weapon',
      'Brandishing a Weapon',
      'Discharge of Firearm',
      'Drive-By Shooting',
      'Possession of Explosive Device',
      'Manufacturing Explosive Device',
      'Weapons Violation (Federal)',
      'Illegal Sale of Firearms',
      'Straw Purchase of Firearms'
    ]
  },
  
  dui: {
    name: 'DUI/DWI',
    color: 'pink',
    crimes: [
      'DUI',
      'DWI',
      'OWI',
      'Aggravated DUI',
      'Felony DUI',
      'DUI with Injury',
      'DUI with Death',
      'Vehicular Manslaughter (DUI)',
      'Refusal to Submit to Testing',
      'Hit and Run',
      'Leaving Scene of Accident',
      'Reckless Driving',
      'Vehicular Assault'
    ]
  },
  
  cyber: {
    name: 'Cybercrime',
    color: 'cyan',
    crimes: [
      'Computer Fraud',
      'Hacking',
      'Unauthorized Access',
      'Data Breach',
      'Identity Theft (Online)',
      'Phishing',
      'Cyberstalking',
      'Online Harassment',
      'Distribution of Malware',
      'Ransomware',
      'DDoS Attack',
      'Credit Card Fraud (Online)',
      'Internet Fraud',
      'Email Scams',
      'Online Impersonation'
    ]
  },
  
  other: {
    name: 'Other/Miscellaneous',
    color: 'gray',
    crimes: [
      'Probation Violation',
      'Parole Violation',
      'Failure to Appear',
      'Contempt of Court',
      'Perjury',
      'Obstruction of Justice',
      'Witness Tampering',
      'Resisting Arrest',
      'Escape',
      'Flight',
      'False Reporting',
      'Filing False Police Report',
      'Disorderly Conduct',
      'Public Intoxication',
      'Loitering',
      'Solicitation',
      'Animal Cruelty',
      'Child Endangerment',
      'Contributing to Delinquency of Minor',
      'Unlawful Gambling'
    ]
  }
};

// Flat list for dropdowns
export const allConvictions = Object.values(convictionCategories).flatMap(category => 
  category.crimes.map(crime => ({
    value: crime.toLowerCase().replace(/\s+/g, '_'),
    label: crime,
    category: category.name,
    color: category.color
  }))
);

// Helper to get category by crime
export function getCategoryByCrime(crime: string) {
  for (const [key, category] of Object.entries(convictionCategories)) {
    if (category.crimes.some(c => c.toLowerCase() === crime.toLowerCase())) {
      return category;
    }
  }
  return convictionCategories.other;
}

export default convictionCategories;
