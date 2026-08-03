
export const mockSamples = [
{
  id: 'S_DW_01',
  sampleLetter: 'A',
  type: 'Drinking Water',
  collectionTime: '10:30 AM',
  status: 'Completed',
  cocNumber: 'COC-2024-001',
  remainingVolume: 650,
  category: 'Inlet'
},
{
  id: 'S_WW_01',
  sampleLetter: 'B',
  type: 'Wastewater',
  collectionTime: '11:00 AM',
  status: 'Testing',
  cocNumber: 'COC-2024-001',
  remainingVolume: 820,
  category: 'Outlet'
},
{
  id: 'S_RW_01',
  sampleLetter: 'C',
  type: 'Raw Water',
  collectionTime: '02:15 PM',
  status: 'Testing',
  cocNumber: 'COC-2024-002',
  remainingVolume: 600,
  category: 'Inlet'
},
{
  id: 'S_IW_01',
  sampleLetter: 'D',
  type: 'Industrial Water',
  collectionTime: '03:30 PM',
  status: 'Completed',
  cocNumber: 'COC-2024-003',
  remainingVolume: 750,
  category: 'Outlet'
},
{
  id: 'S_GW_01',
  sampleLetter: 'E',
  type: 'Groundwater',
  collectionTime: '09:00 AM',
  status: 'Pending',
  cocNumber: 'COC-2024-004',
  remainingVolume: 900,
  category: 'Inlet'
},
{
  id: 'S_SW_01',
  sampleLetter: 'F',
  type: 'Surface Water',
  collectionTime: '09:30 AM',
  status: 'Testing',
  cocNumber: 'COC-2024-004',
  remainingVolume: 850,
  category: 'Outlet'
}];


export const mockTestResults = [
// ICP test for S_DW_01 with parameter results
{
  id: 'T-01',
  sampleId: 'S_DW_01',
  testName: 'ICP',
  result: '10 parameters',
  unit: 'mg/L',
  limit: 'Various',
  status: 'Pass',
  method: 'ICP-OES',
  category: 'ICP',
  parameterResults: [
  { parameter: 'Li TM', result: '0.002', unit: 'mg/L', limit: '<0.01', status: 'Pass' },
  { parameter: 'Li DM', result: '0.001', unit: 'mg/L', limit: '<0.01', status: 'Pass' },
  { parameter: 'Be TM', result: '0.0005', unit: 'mg/L', limit: '<0.004', status: 'Pass' },
  { parameter: 'Be DM', result: '0.0003', unit: 'mg/L', limit: '<0.004', status: 'Pass' },
  { parameter: 'Mg TM', result: '12.5', unit: 'mg/L', limit: '<50', status: 'Pass' },
  { parameter: 'Mg DM', result: '12.3', unit: 'mg/L', limit: '<50', status: 'Pass' },
  { parameter: 'Al TM', result: '0.08', unit: 'mg/L', limit: '<0.2', status: 'Pass' },
  { parameter: 'Al DM', result: '0.06', unit: 'mg/L', limit: '<0.2', status: 'Pass' },
  { parameter: 'P TM', result: '0.15', unit: 'mg/L', limit: '<0.5', status: 'Pass' },
  { parameter: 'P DM', result: '0.12', unit: 'mg/L', limit: '<0.5', status: 'Pass' }]

},
// IC test for S_DW_01 with parameter results
{
  id: 'T-02',
  sampleId: 'S_DW_01',
  testName: 'IC',
  result: '7 parameters',
  unit: 'ppm',
  limit: 'Various',
  status: 'Pass',
  method: 'Ion Chromatography',
  category: 'IC',
  parameterResults: [
  { parameter: 'F (ppm)', result: '0.8', unit: 'ppm', limit: '<1.5', status: 'Pass' },
  { parameter: 'Cl (ppm)', result: '18.5', unit: 'ppm', limit: '<250', status: 'Pass' },
  { parameter: 'NO2 (ppm)', result: '0.05', unit: 'ppm', limit: '<1.0', status: 'Pass' },
  { parameter: 'Br (ppm)', result: '0.02', unit: 'ppm', limit: '<0.1', status: 'Pass' },
  { parameter: 'NO3 (ppm)', result: '3.2', unit: 'ppm', limit: '<10', status: 'Pass' },
  { parameter: 'SO4 (ppm)', result: '45.0', unit: 'ppm', limit: '<250', status: 'Pass' },
  { parameter: 'PO4 (ppm)', result: '0.15', unit: 'ppm', limit: '<0.5', status: 'Pass' }]

},
// Alkalinity test for S_DW_01 with parameter results
{
  id: 'T-03',
  sampleId: 'S_DW_01',
  testName: 'Alkalinity',
  result: '8 parameters',
  unit: 'mg/L as CaCO3',
  limit: '20-500',
  status: 'Pass',
  method: 'EPA 310.1',
  category: 'Alkalinity',
  parameterResults: [
  { parameter: 'P Alkalinity', result: '25', unit: 'mg/L as CaCO3', limit: '20-500', status: 'Pass' },
  { parameter: 'T Alkalinity', result: '95', unit: 'mg/L as CaCO3', limit: '20-500', status: 'Pass' },
  { parameter: 'Hydroxide Alkalinity (OH⁻)', result: '0', unit: 'mg/L as CaCO3', limit: 'Various', status: 'Pass' },
  { parameter: 'Carbonate Alkalinity (CO₃²⁻)', result: '50', unit: 'mg/L as CaCO3', limit: 'Various', status: 'Pass' },
  { parameter: 'Bicarbonate Alkalinity (HCO₃⁻)', result: '45', unit: 'mg/L as CaCO3', limit: 'Various', status: 'Pass' },
  { parameter: 'Carbonate Alkalinity', result: '50', unit: 'mg/L as CaCO3', limit: 'Various', status: 'Pass' },
  { parameter: 'Bicarbonate Alkalinity as HCO₃⁻', result: '54.9', unit: 'mg/L', limit: 'Various', status: 'Pass' },
  { parameter: 'Hydroxide Alkalinity as OH⁻', result: '0', unit: 'mg/L', limit: 'Various', status: 'Pass' }]

},
{
  id: 'T-06',
  sampleId: 'S_WW_01',
  testName: 'pH-Conductivity',
  result: '6.1 pH, 880 µS/cm',
  unit: 'pH units / µS/cm',
  limit: '6.5-8.5 / <2500',
  status: 'Warning',
  method: 'EPA 150.1 / EPA 120.1',
  category: 'pH-Conductivity'
},
{
  id: 'T-07',
  sampleId: 'S_WW_01',
  testName: 'TICTOC',
  result: '220 (BOD), 180 (TSS)',
  unit: 'mg/L',
  limit: 'Various',
  status: 'Fail',
  method: 'Total Inorganic/Organic Carbon',
  category: 'TICTOC'
},
{
  id: 'T-08',
  sampleId: 'S_WW_01',
  testName: 'IC',
  result: '3.2 (Nitrate), 0.5 (Ammonia)',
  unit: 'mg/L',
  limit: 'Various',
  status: 'Pass',
  method: 'Ion Chromatography',
  category: 'IC'
},
// Tests for S_RW_01
{
  id: 'T-20',
  sampleId: 'S_RW_01',
  testName: 'pH-Conductivity',
  result: '7.8 pH, 680 µS/cm',
  unit: 'pH units / µS/cm',
  limit: '6.5-9.0 / <2500',
  status: 'Pass',
  method: 'EPA 150.1 / EPA 120.1',
  category: 'pH-Conductivity'
},
{
  id: 'T-21',
  sampleId: 'S_RW_01',
  testName: 'TICTOC',
  result: '680 (TDS), 12.5 (Turbidity)',
  unit: 'mg/L',
  limit: 'Various',
  status: 'Pass',
  method: 'Total Inorganic/Organic Carbon',
  category: 'TICTOC'
},
{
  id: 'T-22',
  sampleId: 'S_RW_01',
  testName: 'Alkalinity',
  result: '140',
  unit: 'mg/L as CaCO3',
  limit: '20-500',
  status: 'Pass',
  method: 'EPA 310.1',
  category: 'Alkalinity'
},
{
  id: 'T-23',
  sampleId: 'S_RW_01',
  testName: 'ICP',
  result: '0.45 (Iron), 0.08 (Manganese)',
  unit: 'mg/L',
  limit: 'Various',
  status: 'Pass',
  method: 'ICP-OES',
  category: 'ICP'
},
// Tests for S_IW_01
{
  id: 'T-24',
  sampleId: 'S_IW_01',
  testName: 'pH-Conductivity',
  result: '8.2 pH, 920 µS/cm',
  unit: 'pH units / µS/cm',
  limit: '6.0-9.0 / <2500',
  status: 'Pass',
  method: 'EPA 150.1 / EPA 120.1',
  category: 'pH-Conductivity'
},
{
  id: 'T-25',
  sampleId: 'S_IW_01',
  testName: 'TICTOC',
  result: '185 (COD), 95 (TSS)',
  unit: 'mg/L',
  limit: 'Various',
  status: 'Pass',
  method: 'Total Inorganic/Organic Carbon',
  category: 'TICTOC'
},
{
  id: 'T-26',
  sampleId: 'S_IW_01',
  testName: 'IC',
  result: '2.5 (Phosphorus), 8 (Oil/Grease)',
  unit: 'mg/L',
  limit: 'Various',
  status: 'Pass',
  method: 'Ion Chromatography',
  category: 'IC'
},
{
  id: 'T-27',
  sampleId: 'S_IW_01',
  testName: 'ICP',
  result: '0.04 (Chromium), 0.08 (Nickel)',
  unit: 'mg/L',
  limit: 'Various',
  status: 'Pass',
  method: 'ICP-OES',
  category: 'ICP'
},
// Tests for S_GW_01
{
  id: 'T-30',
  sampleId: 'S_GW_01',
  testName: 'pH-Conductivity',
  result: '7.2 pH, 450 µS/cm',
  unit: 'pH units / µS/cm',
  limit: '6.5-8.5 / <1500',
  status: 'Pass',
  method: 'EPA 150.1 / EPA 120.1',
  category: 'pH-Conductivity'
},
// Tests for S_SW_01
{
  id: 'T-31',
  sampleId: 'S_SW_01',
  testName: 'TICTOC',
  result: '5.8 (DO), 18.5 (Turbidity)',
  unit: 'mg/L',
  limit: 'Various',
  status: 'Pass',
  method: 'Total Inorganic/Organic Carbon',
  category: 'TICTOC'
},
{
  id: 'T-32',
  sampleId: 'S_SW_01',
  testName: 'IC',
  result: '0.8 (Nitrate), 0.02 (Phosphate)',
  unit: 'mg/L',
  limit: 'Various',
  status: 'Pass',
  method: 'Ion Chromatography',
  category: 'IC'
},
{
  id: 'T-33',
  sampleId: 'S_SW_01',
  testName: 'Alkalinity',
  result: '85',
  unit: 'mg/L as CaCO3',
  limit: '20-500',
  status: 'Pass',
  method: 'EPA 310.1',
  category: 'Alkalinity'
}];


export const mockTestTypes = [
{
  id: 'TT--Infinity',
  name: 'TIC',
  description: 'TIC',
  color: 'bg-orange-100',
  iconColor: 'bg-orange-600',
  borderColor: 'border-orange-400',
  category: 'ICP',
  isActive: true,
  hasSubtests: false,
  parameters: [
  {
    id: 'TP-1',
    name: 'TIC result',
    unit: 'ppm',
    minLimit: '',
    maxLimit: '',
    method: ''
  },
  {
    id: 'TP-2',
    name: 'TIC final result',
    unit: 'ppm',
    minLimit: '',
    maxLimit: '',
    method: ''
  },
  {
    id: 'TP-3',
    name: 'TIC as CaCO3',
    unit: '-',
    minLimit: '',
    maxLimit: '',
    method: ''
  }],

  createdBy: 'Super Admin',
  createdDate: '2026-03-15',
  modifiedBy: 'Super Admin',
  modifiedDate: '2026-03-15'
}];