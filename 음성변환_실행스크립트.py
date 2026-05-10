#!/usr/bin/env python3
"""
포스코 학생 공모전 통화 녹음 → 한국어 텍스트 변환 스크립트
==========================================================
실행 방법:
  1. Python 3.8+ 설치 (https://python.org)
  2. 필요 패키지 설치:
       pip install faster-whisper
  3. 이 스크립트를 실행:
       python 음성변환_실행스크립트.py

모델 첫 실행 시 자동 다운로드 (~150MB, small 모델)
"""

import os
import sys
import time
from pathlib import Path

# ─── 경로 설정 ─────────────────────────────────────────────────────────────
# 이 스크립트 위치 기준으로 음성 폴더 찾기
SCRIPT_DIR = Path(__file__).parent

# 음성 파일 경로 (상대 경로로 지정)
AUDIO_DIR = SCRIPT_DIR.parent / "음성"  # 상위 폴더의 '음성' 디렉토리
OUT_DIR   = SCRIPT_DIR                  # 결과 파일은 이 스크립트와 같은 폴더에 저장

AUDIO_FILES = [
    "통화 녹음 포스코 학생 공모전_260507_213718.m4a",   # 11.8분 (10MB)
    "통화 녹음 포스코 학생 공모전_260507_215032.m4a",   # 1.0분 (989KB)
]

# ─── 패키지 임포트 ──────────────────────────────────────────────────────────
try:
    from faster_whisper import WhisperModel
except ImportError:
    print("❌ faster-whisper 미설치. 아래 명령어를 먼저 실행하세요:")
    print("   pip install faster-whisper")
    sys.exit(1)

# ─── 모델 로딩 ──────────────────────────────────────────────────────────────
print("=" * 60)
print("  포스코 공모전 통화 녹음 텍스트 변환")
print("=" * 60)
print()
print("🔧 Whisper small 모델 로딩 중... (첫 실행 시 다운로드 약 150MB)")
print("   모델 저장 위치: ~/.cache/huggingface/hub/")
print()

model = WhisperModel(
    "small",           # tiny/base/small/medium/large-v3 선택 가능
                       # small: 한국어 정확도 우수, 속도 빠름 (권장)
                       # medium: 더 높은 정확도 (느림)
    device="cpu",
    compute_type="int8",
)
print("✅ 모델 로드 완료\n")

# ─── 변환 실행 ──────────────────────────────────────────────────────────────
all_results = []

for fname in AUDIO_FILES:
    audio_path = AUDIO_DIR / fname

    if not audio_path.exists():
        print(f"⚠️  파일 없음 (건너뜀): {audio_path}")
        print(f"    → 음성 폴더 위치: {AUDIO_DIR}")
        continue

    size_mb = audio_path.stat().st_size / (1024 * 1024)
    print(f"🎙️  변환 시작: {fname}")
    print(f"   파일 크기: {size_mb:.1f}MB")

    t0 = time.time()

    segments, info = model.transcribe(
        str(audio_path),
        language="ko",
        beam_size=5,
        vad_filter=True,
        vad_parameters={"min_silence_duration_ms": 500},
    )

    lines = []
    for seg in segments:
        mm = int(seg.start // 60)
        ss = seg.start % 60
        ts = f"[{mm:02d}:{ss:05.2f}]"
        lines.append(f"{ts} {seg.text.strip()}")

    elapsed = time.time() - t0
    full_text = "\n".join(lines)
    all_results.append((fname, full_text, lines))

    print(f"✅ 완료 ({elapsed:.0f}초) — {len(lines)}개 세그먼트")
    print()
    print("--- 미리보기 (첫 8줄) ---")
    for l in lines[:8]:
        print(l)
    print()

# ─── 결과 저장 ──────────────────────────────────────────────────────────────
OUT_DIR.mkdir(parents=True, exist_ok=True)

for fname, text, lines in all_results:
    stem = Path(fname).stem
    out_path = OUT_DIR / f"{stem}_텍스트변환.txt"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(f"# 음성 텍스트 변환 결과\n")
        f.write(f"# 원본 파일: {fname}\n")
        f.write(f"# 변환 모델: Whisper small (한국어)\n")
        f.write(f"# 세그먼트 수: {len(lines)}개\n\n")
        f.write(text)
    print(f"💾 저장: {out_path}")

# 통합 파일
if all_results:
    combined = OUT_DIR / "포스코공모전_통화녹음_전체_텍스트변환.txt"
    with open(combined, "w", encoding="utf-8") as f:
        f.write("# 포스코 학생 공모전 통화 녹음 — 전체 텍스트 변환\n")
        f.write(f"# 변환 모델: Whisper small (한국어)\n\n")
        for fname, text, _ in all_results:
            f.write(f"{'='*60}\n## {fname}\n{'='*60}\n\n")
            f.write(text)
            f.write("\n\n")
    print(f"\n🎉 통합 파일 저장: {combined}")

print("\n✅ 모든 변환 완료!")
