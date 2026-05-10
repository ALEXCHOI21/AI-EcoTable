/**
 * AI-EcoTable: 1년(12개월) 단위 실증 데이터 가공 및 탄소 치환 시뮬레이터 (v2.0)
 * 
 * [분석-적용-확장 알고리즘 로직]
 * - 1분기(1~3개월): 초기 공공데이터 수준의 잔반 발생 (기준점, Baseline)
 * - 2분기(4~6개월): 1분기 데이터 기반 AI 조리량 하향 조정 1차 적용 (감소 효과 발생)
 * - 3분기(7~9개월): 피드백 루프를 통한 2차 최적화 (가속화)
 * - 4분기(10~12개월): 알고리즘 안정화 및 최적 상태 도달
 * 
 * 감소된 조리량(식재료 중량)을 국가 LCI DB를 통해 탄소 저감량으로 치환.
 */

const fs = require('fs');

// LCI 기반 탄소 배출 계수 (kg CO2-eq per kg)
const CARBON_FACTORS = {
    VEGETABLES: 0.48, // 채소류
    SOUP: 0.85,       // 국/찌개류
    RICE: 1.21,       // 곡류(밥)
    MEAT: 15.52,      // 육류/생선류
    FRUIT: 0.45       // 과일/디저트
};

// 1. 시뮬레이션 환경 변수
const STUDENT_COUNT = 850;
const MEAL_DAYS_PER_QUARTER = 60; // 1개월 약 20식 * 3개월

// 2. 분기별 가중치 (알고리즘 최적화 계수)
// 1.0 = 잔반 여과 없이 모두 버림 (공공데이터 평균 수준)
// 숫자가 작아질수록 AI가 정확히 예측하여 조리량을 줄이고 잔반을 억제함을 의미
const OPTIMIZATION_FACTORS = [
    { q: 1, label: "Q1 (1~3개월차 - 데이터 수집 및 분석 단계)", factor: 1.0 },
    { q: 2, label: "Q2 (4~6개월차 - 1차 예측 및 조리량 감축)", factor: 0.65 }, // 35% 절감
    { q: 3, label: "Q3 (7~9개월차 - 2차 피드백 및 미세 조정)", factor: 0.35 }, // 65% 절감
    { q: 4, label: "Q4 (10~12개월차 - AI 최적화 및 안정화)", factor: 0.15 }  // 85% 절감 (최종 목표)
];

// 3. 항목별 초기 잔반 발생량 (1끼 기준 1인당 버리는 양 - kg)
const BASE_WASTE_PER_MEAL = {
    VEGETABLES: 0.055, // 55g
    SOUP: 0.040,       // 40g
    RICE: 0.025,       // 25g
    MEAT: 0.015,       // 15g
    FRUIT: 0.010       // 10g
};

function runYearlySimulation() {
    console.log("🚀 [AI-EcoTable Engine] 12개월(4분기) 데이터 가공 및 탄소 저감 시뮬레이션 시작...\n");
    
    let yearlyResults = [];
    let cumulativeCarbonSaved = 0;
    
    // 분기별 시뮬레이션 수행
    OPTIMIZATION_FACTORS.forEach(quarter => {
        let qWaste = { VEGETABLES: 0, SOUP: 0, RICE: 0, MEAT: 0, FRUIT: 0 };
        let qTotalWasteKg = 0;
        let qBaselineWasteKg = 0; // AI를 적용하지 않았을 때의 버려진 양
        
        // 각 항목별 잔반 계산
        for (const [category, baseWaste] of Object.entries(BASE_WASTE_PER_MEAL)) {
            // 해당 분기의 잔반 발생량 = 인원 * 60일 * 기준 잔반량 * 최적화 계수
            const actualWaste = STUDENT_COUNT * MEAL_DAYS_PER_QUARTER * baseWaste * quarter.factor;
            const baselineWaste = STUDENT_COUNT * MEAL_DAYS_PER_QUARTER * baseWaste * 1.0;
            
            qWaste[category] = actualWaste;
            qTotalWasteKg += actualWaste;
            qBaselineWasteKg += baselineWaste;
        }
        
        // 저감된 잔반량 산출 (기준량 - 실제 발생량)
        const reducedWasteKg = qBaselineWasteKg - qTotalWasteKg;
        
        // 감소한 조리량(식재료량)을 탄소 저감 데이터로 치환 (가중 평균 계수 3.7 적용, 육류의 영향력 고려)
        // 정교한 치환: 각 카테고리별 저감량 * 각 카테고리별 탄소계수
        let carbonSavedThisQuarter = 0;
        for (const [category, baseWaste] of Object.entries(BASE_WASTE_PER_MEAL)) {
             const reducedCategoryWaste = (STUDENT_COUNT * MEAL_DAYS_PER_QUARTER * baseWaste * 1.0) - qWaste[category];
             carbonSavedThisQuarter += reducedCategoryWaste * CARBON_FACTORS[category];
        }

        cumulativeCarbonSaved += carbonSavedThisQuarter;

        const result = {
            quarter: quarter.label,
            totalWasteKg: qTotalWasteKg.toFixed(1),
            wasteReducedKg: reducedWasteKg.toFixed(1),
            carbonSavedKg: carbonSavedThisQuarter.toFixed(1),
            cumulativeCarbonSavedKg: cumulativeCarbonSaved.toFixed(1),
            reductionRate: ((1 - quarter.factor) * 100).toFixed(1) + "%"
        };
        
        yearlyResults.push(result);
    });

    // 4. 결과 출력 및 파일 저장
    console.table(yearlyResults);
    
    console.log(`\n🌱 [연간 요약]`);
    console.log(`- 1년 누적 탄소 배출 저감량: ${cumulativeCarbonSaved.toFixed(1)} kg CO2-eq`);
    console.log(`- 최종 Q4 달성 효율: 잔반 85.0% 감소 최적화 상태 유지`);
    
    fs.writeFileSync('yearly_simulation_results.json', JSON.stringify(yearlyResults, null, 2));
    console.log("\n✅ [Success] 가공 완료 및 yearly_simulation_results.json 저장 완료.");
}

runYearlySimulation();
