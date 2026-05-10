<style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700;900&family=Outfit:wght@500;800&display=swap');

    body { font-family: 'Noto Sans KR', sans-serif; line-height: 1.7; color: #1a1a1a; background-color: #fcfcfc; }
    
    /* Premium Header Area */
    .header-container { 
        background: linear-gradient(135deg, #001f3f 0%, #003366 100%); 
        color: white; 
        padding: 60px 40px; 
        text-align: center; 
        border-radius: 0 0 40px 40px; 
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        margin-bottom: 50px;
    }
    .header-container .sup-title { 
        font-family: 'Outfit', sans-serif; 
        font-weight: 500; 
        letter-spacing: 3px; 
        font-size: 14px; 
        color: #d4af37; /* Gold Accent */
        text-transform: uppercase;
        margin-bottom: 15px;
        display: block;
    }
    .header-container h1 { 
        margin: 0; 
        font-size: 34px; 
        font-weight: 900; 
        line-height: 1.2;
        letter-spacing: -1px;
    }
    .header-container .sub-text { 
        margin-top: 20px; 
        font-size: 18px; 
        font-weight: 300; 
        opacity: 0.9; 
    }

    /* Section Structure */
    .section-title { 
        display: flex; 
        align-items: center; 
        margin: 60px 0 30px; 
        font-size: 24px; 
        font-weight: 800; 
        color: #001f3f;
    }
    .section-title::before { 
        content: ""; 
        width: 6px; 
        height: 24px; 
        background: #d4af37; 
        margin-right: 15px; 
        border-radius: 3px;
    }

    /* Value Cards */
    .grid-container { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 40px; }
    .value-card { 
        background: white; 
        border: 1px solid #eee; 
        padding: 30px; 
        border-radius: 24px; 
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    }
    .value-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.08); }
    .value-card h3 { color: #001f3f; font-size: 20px; margin-top: 0; margin-bottom: 15px; }
    .value-card p { font-size: 15px; color: #555; margin: 0; }

    /* Idea Cards (Elite Design) */
    .idea-card { 
        background: white; 
        border-radius: 30px; 
        overflow: hidden; 
        margin-bottom: 40px; 
        box-shadow: 0 15px 40px rgba(0,0,0,0.05);
        border: 1px solid rgba(0,0,0,0.03);
    }
    .idea-card .card-header { 
        background: #f8f9fa; 
        padding: 25px 40px; 
        border-bottom: 1px solid #eee; 
        display: flex; 
        justify-content: space-between; 
        align-items: center;
    }
    .idea-card .card-body { padding: 40px; }
    .tag { 
        background: #eef2f7; 
        color: #003366; 
        padding: 5px 15px; 
        border-radius: 50px; 
        font-size: 13px; 
        font-weight: 700;
    }
    .idea-card h3 { font-size: 24px; color: #001f3f; margin: 0 0 15px; }
    .idea-card .slogan { font-size: 18px; color: #d4af37; font-weight: 700; margin-bottom: 25px; display: block; }
    .idea-card ul { padding-left: 20px; margin: 0; }
    .idea-card li { margin-bottom: 12px; color: #444; }
    .idea-card li b { color: #001f3f; }

    /* Support Section */
    .support-box { 
        background: #001f3f; 
        color: white; 
        padding: 50px; 
        border-radius: 35px; 
        position: relative; 
        overflow: hidden;
    }
    .support-box::after {
        content: "Elite AI";
        position: absolute;
        right: -20px;
        bottom: -20px;
        font-size: 120px;
        font-weight: 900;
        opacity: 0.05;
        font-family: 'Outfit';
    }
    .support-box h2 { color: #d4af37; margin-top: 0; font-size: 28px; }
    .support-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 30px; margin-top: 30px; }
    .support-item h4 { color: #d4af37; margin-bottom: 10px; font-size: 18px; }
    .support-item p { font-size: 14px; opacity: 0.8; line-height: 1.5; }

    .footer { text-align: center; padding: 60px 0; color: #aaa; font-size: 13px; letter-spacing: 1px; }
</style>

<div class="header-container">
    <span class="sup-title">The Future of AI Leadership</span>
    <h1>제7회 전국 청소년 AI창의 경진대회</h1>
    <div class="sub-text">
        서울대학교 AI연구원 멘토링 기반, <br>
        <strong>입시의 격을 높이는 상위 1% 프로젝트</strong>
    </div>
</div>

<div class="section-title">01. 대회적 권위와 독보적 기회</div>
<div class="grid-container">
    <div class="value-card">
        <h3>🏛️ 국가급 공신력의 커리어</h3>
        <p><b>교육부 후원 및 포스코DX 주최.</b> 단순 수상을 넘어 본선 진출 시 주어지는 <b>서울대 AI연구원 전문가 멘토링</b>은 그 자체로 최고의 증명이 됩니다.</p>
    </div>
    <div class="value-card">
        <h3>🎓 차별화된 포트폴리오 구축</h3>
        <p>인공지능, 로봇, 공학 계열 진학을 위한 <b>'킬러 콘텐츠'</b>. 아이디어 기획부터 하드웨어 설계(PCB), 딥러닝 구현까지의 전 과정을 학생이 직접 주도합니다.</p>
    </div>
</div>

<div class="section-title">02. 핵심 전략 프로젝트 (3 Master Plans)</div>

<!-- Idea 1 -->
<div class="idea-card">
    <div class="card-header">
        <span class="tag">Vision AI / ESG</span>
        <span style="font-size: 12px; color: #888;">Selected Project Alpha</span>
    </div>
    <div class="card-body">
        <h3>AI-EcoTable: 데이터 기반 잔반 제로 솔루션</h3>
        <span class="slogan">"버려지는 식판에서 학교 급식의 지속 가능한 내일을 찾다"</span>
        <ul>
            <li><b>핵심 기술:</b> Edge AI 카메라를 통한 실시간 이미지 분석 및 탄소 배출 데이터 가시화</li>
            <li><b>차별화 포인트:</b> 단순 인식을 넘어 배식 메뉴 데이터와 연동한 '메뉴 최적화 제안' 알고리즘</li>
            <li><b>교육 가치:</b> AI 기술을 통한 환경 문제(ESG) 해결 역량을 생생하게 증명</li>
        </ul>
    </div>
</div>

<!-- Idea 2 -->
<div class="idea-card">
    <div class="card-header">
        <span class="tag">Upcycling / Maker</span>
        <span style="font-size: 12px; color: #888;">Selected Project Beta</span>
    </div>
    <div class="card-body">
        <h3>AI-E-Cycle: 지능형 폐가전 리사이클링 도우미</h3>
        <span class="slogan">"쓰레기통으로 갈 뻔한 부품에 AI로 새로운 쓸모를 부여하다"</span>
        <ul>
            <li><b>핵심 기술:</b> 가전 내부 부품 자동 식별 및 재사용 가능 부품 등급 평가 시스템</li>
            <li><b>차별화 포인트:</b> 식별된 부품을 활용한 '최적 과학교구 제작 가이드' AI 추천 엔진</li>
            <li><b>교육 가치:</b> 하드웨어 아키텍처에 대한 깊은 이해와 자원 순환 의식의 융합</li>
        </ul>
    </div>
</div>

<!-- Idea 3 -->
<div class="idea-card">
    <div class="card-header">
        <span class="tag">Assistive Tech / Welfare</span>
        <span style="font-size: 12px; color: #888;">Selected Project Gamma</span>
    </div>
    <div class="card-body">
        <h3>AI-Touch-View: 시각장애인용 실시간 촉각 변환기</h3>
        <span class="slogan">"눈으로 보는 데이터의 감동을 손끝으로 읽는 기술로"</span>
        <ul>
            <li><b>핵심 기술:</b> 그래프 및 도표 특징점 추출 알고리즘 및 물리적 촉각 액추에이터 제어</li>
            <li><b>차별화 포인트:</b> Transformer 기반의 정밀 데이터 변환으로 복잡한 수치 정보까지 표현</li>
            <li><b>교육 가치:</b> 따뜻한 기술(Tech for Good) 구현을 통한 사회적 가치 실현 역량 증명</li>
        </ul>
    </div>
</div>

<div class="support-box">
    <h2>03. ChoiGPT Corp. 전문가 밀착 기술 지원</h2>
    <div class="support-grid">
        <div class="support-item">
            <h4>Advanced Engineering</h4>
            <p>시중의 키트 조립을 넘어, 실무 수준의 <b>정밀 PCB 설계</b> 및 커스텀 하드웨어 제어 로직을 지원합니다.</p>
        </div>
        <div class="support-item">
            <h4>Deep Learning Stack</h4>
            <p><b>YOLO, Transformer</b> 등 최신 모델을 최적화하여 저전력 기기에서도 실시간 구동되도록 이식합니다.</p>
        </div>
        <div class="support-item">
            <h4>Strategic Storytelling</h4>
            <p>서울대 심사위원단의 논리를 관통하는 <b>고난도 기획서</b> 및 시각적 발표 전략을 수립합니다.</p>
        </div>
    </div>
</div>

<div class="footer">
    <p>CONFIDENTIAL | © 2026 ChoiGPT Corp. Private Strategy for High-Performance Students.</p>
</div>
