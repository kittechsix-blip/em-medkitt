// EM Decision Trees — Reference Tables & Info Panels
// Diagnostic test performance, monitoring schedules, and evidence citations.
const DIAGNOSTIC_TESTS = [
    { test: 'CSF-VDRL', sensitivity: '49\u201387.5%', specificity: '74\u2013100%', role: 'Cornerstone. Reactive = diagnostic (with neuro signs)' },
    { test: 'CSF-RPR', sensitivity: '51.5\u201381.8%', specificity: '81.8\u2013100%', role: 'Similar to VDRL, may be less sensitive' },
    { test: 'CSF FTA-ABS', sensitivity: '91\u2013100%', specificity: '~55%', role: 'High sensitivity. Negative = rules out neurosyphilis' },
    { test: 'CSF TP-PA', sensitivity: '~97%', specificity: '~84%', role: 'Highest sensitivity. Negative = rules out' },
    { test: 'CSF TPHA', sensitivity: '91\u2013100%', specificity: '~55%', role: 'Similar to FTA-ABS' },
    { test: 'CSF PCR (qPCR)', sensitivity: '41\u201342.5%', specificity: '97\u2013100%', role: 'Confirms active CNS infection when positive' },
    { test: 'CSF PCR (nested)', sensitivity: '27%', specificity: '100%', role: 'Most specific but least sensitive' },
    { test: 'CSF WBC >5/mm\u00b3', sensitivity: 'Sensitive', specificity: 'Not specific', role: 'Baseline for non-HIV' },
    { test: 'CSF WBC >20/mm\u00b3', sensitivity: '\u2014', specificity: 'More specific', role: 'Better cutoff for HIV+ patients' },
    { test: 'CSF protein', sensitivity: 'Low', specificity: 'Low', role: 'Normalizes slowly after treatment' },
];
const CITATIONS = [
    { num: 1, text: 'Workowski KA, et al. STI Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187.' },
    { num: 2, text: 'Tuddenham S, et al. Syphilis Laboratory Guidelines: NTT Performance. Clin Infect Dis. 2020;71(S1):S21-S42.' },
    { num: 3, text: 'Ding D, et al. Diagnostic Performance of Lab Tests of Neurosyphilis: Systematic Review & Network Meta-Analysis. Eur Neurol. 2023;86(6):418-429.' },
    { num: 4, text: 'Chevalier FJ, et al. Syphilis. JAMA. 2025.' },
    { num: 5, text: 'Ropper AH. Neurosyphilis. N Engl J Med. 2019;381(14):1358-1363.' },
    { num: 6, text: 'Peeling RW, et al. Syphilis. Lancet. 2023;402(10398):336-346.' },
    { num: 7, text: 'Ghanem KG, et al. The Modern Epidemic of Syphilis. N Engl J Med. 2020;382(9):845-854.' },
    { num: 8, text: 'Vanhaecke C, et al. Neurosyphilis and T. pallidum Nested PCR in CSF. Clin Infect Dis. 2016;63(9):1180-1186.' },
    { num: 9, text: 'Benson C, et al. OI Guidelines for Adults/Adolescents With HIV. IDSA/OARAC. 2025.' },
    { num: 10, text: 'Bettuzzi T, et al. Ceftriaxone vs Benzylpenicillin in Neurosyphilis. Lancet Infect Dis. 2021;21(10):1441-1447.' },
    { num: 11, text: 'Dunaway SB, et al. Neurosyphilis Treatment: IV PCN G vs IM Procaine PCN + Probenecid. Clin Infect Dis. 2020;71(2):267-273.' },
    { num: 12, text: 'Davis AP, et al. How Well Do Neurologic Symptoms Identify Neurosyphilis? Clin Infect Dis. 2018;66(3):363-367.' },
    { num: 13, text: 'Salle R, et al. Molecular vs Serological Assays on CSF for Neurosyphilis. JEADV. 2023;37(2):390-394.' },
    { num: 14, text: 'Vrbov\u00e1 E, et al. Nested PCR Detection of Syphilis Treponemes. PLoS One. 2020;15(8):e0237949.' },
    { num: 15, text: 'Tuddenham S, et al. Diagnosis and Treatment of STIs: A Review. JAMA. 2022;327(2):161-172.' },
    { num: 16, text: 'Miller JM, et al. Microbiology Lab Utilization Guide: 2024 Update. IDSA/ASM. Clin Infect Dis. 2024.' },
    { num: 17, text: 'Thompson MA, et al. Primary Care Guidance for Persons With HIV: 2020 Update. HIVMA/IDSA. Clin Infect Dis. 2021;73(11):e3572-e3605.' },
];
// -------------------------------------------------------------------
// Render: Reference Panel (standalone page)
// -------------------------------------------------------------------
/** Render the full reference panel into a container */
export function renderReferencePanel(container) {
    container.innerHTML = '';
    // Back button
    const backBtn = document.createElement('button');
    backBtn.className = 'btn-text';
    backBtn.textContent = '\u2190 Back';
    backBtn.addEventListener('click', () => history.back());
    container.appendChild(backBtn);
    const heading = document.createElement('h2');
    heading.className = 'reference-heading';
    heading.textContent = 'Neurosyphilis Reference';
    container.appendChild(heading);
    // Diagnostic test table
    renderTestTable(container);
    // Key clinical notes
    renderClinicalNotes(container);
    // Citations
    renderCitationsPanel(container);
    // Disclaimer
    renderDisclaimer(container);
}
// -------------------------------------------------------------------
// Render: Inline Citations (for use from result cards)
// -------------------------------------------------------------------
/** Render a citations panel showing specific citation numbers */
export function renderInlineCitations(container, citationNums) {
    const section = document.createElement('details');
    section.className = 'reference-citations-inline';
    const summary = document.createElement('summary');
    summary.textContent = `\u25B8 References (${citationNums.length})`;
    section.appendChild(summary);
    const list = document.createElement('div');
    list.className = 'reference-citation-list';
    for (const num of citationNums) {
        const cite = CITATIONS.find(c => c.num === num);
        if (!cite)
            continue;
        const item = document.createElement('div');
        item.className = 'reference-citation-item';
        const numEl = document.createElement('span');
        numEl.className = 'reference-citation-num';
        numEl.textContent = `[${cite.num}]`;
        const textEl = document.createElement('span');
        textEl.className = 'reference-citation-text';
        textEl.textContent = cite.text;
        item.appendChild(numEl);
        item.appendChild(textEl);
        list.appendChild(item);
    }
    section.appendChild(list);
    container.appendChild(section);
}
// -------------------------------------------------------------------
// Diagnostic Test Performance Table
// -------------------------------------------------------------------
function renderTestTable(container) {
    const section = document.createElement('div');
    section.className = 'reference-section';
    const title = document.createElement('h3');
    title.className = 'reference-section-title';
    title.textContent = 'CSF Diagnostic Test Performance';
    section.appendChild(title);
    // Card layout for mobile
    for (const row of DIAGNOSTIC_TESTS) {
        const card = document.createElement('div');
        card.className = 'reference-test-card';
        const testName = document.createElement('div');
        testName.className = 'reference-test-name';
        testName.textContent = row.test;
        card.appendChild(testName);
        const stats = document.createElement('div');
        stats.className = 'reference-test-stats';
        const senEl = document.createElement('span');
        senEl.className = 'reference-stat';
        senEl.innerHTML = '';
        const senLabel = document.createElement('span');
        senLabel.className = 'reference-stat-label';
        senLabel.textContent = 'Sensitivity';
        const senValue = document.createElement('span');
        senValue.className = 'reference-stat-value';
        senValue.textContent = row.sensitivity;
        senEl.appendChild(senLabel);
        senEl.appendChild(senValue);
        const specEl = document.createElement('span');
        specEl.className = 'reference-stat';
        const specLabel = document.createElement('span');
        specLabel.className = 'reference-stat-label';
        specLabel.textContent = 'Specificity';
        const specValue = document.createElement('span');
        specValue.className = 'reference-stat-value';
        specValue.textContent = row.specificity;
        specEl.appendChild(specLabel);
        specEl.appendChild(specValue);
        stats.appendChild(senEl);
        stats.appendChild(specEl);
        card.appendChild(stats);
        const roleEl = document.createElement('div');
        roleEl.className = 'reference-test-role';
        roleEl.textContent = row.role;
        card.appendChild(roleEl);
        section.appendChild(card);
    }
    // Meta-analysis ranking
    const ranking = document.createElement('div');
    ranking.className = 'reference-note';
    ranking.textContent = 'Ranking (Ding et al., 2023): CSF-TPHA > TRUST > CSF-VDRL > CSF-EIA > RPR';
    section.appendChild(ranking);
    container.appendChild(section);
}
// -------------------------------------------------------------------
// Clinical Notes
// -------------------------------------------------------------------
function renderClinicalNotes(container) {
    const section = document.createElement('div');
    section.className = 'reference-section';
    const title = document.createElement('h3');
    title.className = 'reference-section-title';
    title.textContent = 'Key Clinical Notes';
    section.appendChild(title);
    const notes = [
        'Neurologic symptoms: Specificity 91.6\u2013100%, Sensitivity 1.5\u201338.1%. Absence does NOT rule out neurosyphilis.',
        'CSF-VDRL: Reactive result is diagnostic with neuro signs. Nonreactive does NOT rule out neurosyphilis.',
        'CSF FTA-ABS/TP-PA: Nonreactive result makes neurosyphilis highly unlikely (high NPV).',
        'Prozone phenomenon: False-negative NTT at very high titers. Always request dilution if suspicion is high.',
        'HIV+ patients: Use WBC >20/mm\u00b3 cutoff (>5 may be from HIV itself). Same treatment regimens apply.',
        'Penicillin: The ONLY proven effective therapy for neurosyphilis. Desensitize if allergic.',
    ];
    for (const note of notes) {
        const noteEl = document.createElement('div');
        noteEl.className = 'reference-note-card';
        noteEl.textContent = note;
        section.appendChild(noteEl);
    }
    container.appendChild(section);
}
// -------------------------------------------------------------------
// Citations Panel
// -------------------------------------------------------------------
function renderCitationsPanel(container) {
    const section = document.createElement('div');
    section.className = 'reference-section';
    const title = document.createElement('h3');
    title.className = 'reference-section-title';
    title.textContent = 'Evidence Citations';
    section.appendChild(title);
    const list = document.createElement('div');
    list.className = 'reference-citation-list';
    for (const cite of CITATIONS) {
        const item = document.createElement('div');
        item.className = 'reference-citation-item';
        const numEl = document.createElement('span');
        numEl.className = 'reference-citation-num';
        numEl.textContent = `[${cite.num}]`;
        const textEl = document.createElement('span');
        textEl.className = 'reference-citation-text';
        textEl.textContent = cite.text;
        item.appendChild(numEl);
        item.appendChild(textEl);
        list.appendChild(item);
    }
    section.appendChild(list);
    container.appendChild(section);
}
// -------------------------------------------------------------------
// Disclaimer
// -------------------------------------------------------------------
function renderDisclaimer(container) {
    const disclaimer = document.createElement('div');
    disclaimer.className = 'reference-disclaimer';
    disclaimer.textContent = 'This tool is for educational and clinical decision support purposes only. It does not replace clinical judgment. All treatment decisions should be verified against current guidelines and institutional protocols.';
    container.appendChild(disclaimer);
}
