// Veri Yapıları
const dailyTasks = [
    "20–40 dk tempolu yürüyüş",
    "2-3 litre su",
    "Hafif esneme",
    "Omurga egzersizleri",
    "Postür düzeltme",
    "8 saat düzenli uyku",
    "Aynı saatte yat-kalk",
    "Güneş kremi",
    "Nemlendirici",
    "Akşam yemeğini yatmadan ≥3 saat önce ye",
    "İlaçlarını saatinde al",
    "Yavaş ve bilinçli ye",
    "30–45 dk'da bir hareket molası",
    "Diş fırçalama + diş ipi",
    "5–10 dk stres boşaltma",
    "Semptom notu al"
];

const weeklyTasks = [
    "2 gün balık (somon/sardalya/uskumru/alabalık- haşlama/buğulama/fırın)",
    "1 gün kırmızı et (avuç içi kadar- yağsız dana, haşlama)",
    "3 gün köy tavuğu/hindi (derisiz, haşlama/fırın)",
    "3-5 adet yumurta (haşlanmış/az yağlı)",
    "7 gün sebze (pişmiş olarak, koyu yeşil yok)",
    "2–3 gün sebze çorbası (salçasız, soğansız, acısız, kremasız)",
    "7 gün küçük porsiyon karbonhidrat",
    "En fazla 1 gün küçük porsiyon tatlı",
    "Haftada 3–4 gün yürüyüş",
    "Haftada 2 gün basit pilates/yoga",
    "Haftada 1 tartılmak",
    "Haftada 1 tansiyon ölçmek"
];

const monthlyTasks = [
    "İlaç düzenini gözden geçirmek",
    "Eklem ağrısı artışını takip etmek",
    "Beslenmede tetikleyen gıda oldu mu not etmek",
    "Kilo değişimini kontrol etmek",
    "Tansiyon ortalamasına bakmak"
];

const yearlyTasks = [
    "Kardiyoloji kontrol (aort koarktasyonu + HT)",
    "Romatoloji kontrol",
    "Gastroenteroloji kontrol",
    "Endokrinoloji (Hashimoto) kontrol",
    "Nefroloji kontrol",
    "Nöroloji (epilepsi) kontrol",
    "Kemik yoğunluğu (DEXA) kontrol",
    "Diş hekimi kontrol",
    "Göz kontrol",
    "CRP, ESR kan testi",
    "D vitamini testi",
    "B12 testi",
    "Ferritin testi",
    "TSH, T3, T4 testi",
    "Böbrek fonksiyonları testi"
];

const topRules = [
    "Porsiyon kontrolü var, aç kalmak yok",
    "Ağır spor yok, her gün hafif hareket var",
    "Düzenli ve yeterli uyku (7–8 saat)",
    "Doktor kontrollerini aksatmamak",
    "Yumuşak ve antiinflamatuar beslenme",
    "Stres yönetimi (nefes, dinlenme, mola)",
    "Postüre dikkat ve omurgayı korumak",
    "İlaçları saatinde ve düzenli almak",
    "Vücudun sinyallerini takip etmek",
    "Alevlenme tetikleyicilerinden kaçınmak (gece yemek, kızartma, aşırı sıcak, alkol, sigara)"
];

const warnings = {
    food: [
        "Kızartma",
        "Fast food",
        "Çok yağlı yemek",
        "Çok baharatlı, acı",
        "Asitli içecek",
        "Kahve",
        "Çok sıcak içecek",
        "Çikolata, nane",
        "Şerbetli tatlı",
        "Paketli gıda",
        "Turşu, salamura"
    ],
    crohn: [
        "Süt, yoğurt, peynir, krema",
        "Çiğ sebze",
        "Çiğ salata",
        "Koyu yeşil yapraklılar (ıspanak, pazı, roka)",
        "Lahana",
        "Soğan (çiğ), sarımsak (çiğ)",
        "Kepekli, çavdar, bulgur, mısır, çok lifli tahıllar"
    ],
    timing: [
        "Aç kalmak",
        "Gece geç yemek",
        "Gece atıştırması",
        "Çok büyük porsiyon"
    ],
    physical: [
        "Ağırlık kaldırma",
        "Ani eğilme / dönme",
        "Uzun süre ayakta kalmak",
        "Sert yatak",
        "Yanlış oturma",
        "Uzun süre telefona eğilerek bakmak"
    ],
    environment: [
        "Aşırı sıcak hava",
        "Sauna, hamam",
        "Aşırı stres"
    ]
};

// Storage Keys
const STORAGE_KEYS = {
    daily: 'healthTrack_daily',
    weekly: 'healthTrack_weekly',
    monthly: 'healthTrack_monthly',
    yearly: 'healthTrack_yearly',
    notes: 'healthTrack_notes',
    weight: 'healthTrack_weight',
    bp: 'healthTrack_bp',
    lastReset: 'healthTrack_lastReset'
};

// Utility Functions
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

function getWeekNumber() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now - start;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.ceil((diff / oneWeek));
}

function getMonthName() {
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
                    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    return months[new Date().getMonth()];
}

function formatDate(dateStr) {
    const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 
                    'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
    const date = new Date(dateStr);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeDateDisplay();
    initializeTabs();
    checkAutoReset();
    renderAllLists();
    renderRules();
    updateAllProgress();
    updateStatistics();
    loadDailyNotes();
});

function initializeDateDisplay() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('tr-TR', options);
    document.getElementById('weekNumber').textContent = getWeekNumber();
    document.getElementById('monthName').textContent = getMonthName();
    document.getElementById('yearNumber').textContent = now.getFullYear();
}

function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
}

// Auto Reset Logic
function checkAutoReset() {
    const lastReset = JSON.parse(localStorage.getItem(STORAGE_KEYS.lastReset) || '{}');
    const today = getTodayDate();
    const currentWeek = getWeekNumber();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    if (lastReset.day !== today) {
        resetDaily(true);
        lastReset.day = today;
    }

    if (lastReset.week !== currentWeek) {
        resetWeekly(true);
        lastReset.week = currentWeek;
    }

    if (lastReset.month !== currentMonth) {
        resetMonthly(true);
        lastReset.month = currentMonth;
    }

    if (lastReset.year !== currentYear) {
        resetYearly(true);
        lastReset.year = currentYear;
    }

    localStorage.setItem(STORAGE_KEYS.lastReset, JSON.stringify(lastReset));
}

// Render Functions
function renderList(tasks, storageKey, listId, progressId, progressTextId) {
    const listEl = document.getElementById(listId);
    const savedData = JSON.parse(localStorage.getItem(storageKey) || '[]');

    listEl.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = savedData.includes(index);
        checkbox.addEventListener('change', () => {
            handleCheckboxChange(index, storageKey, checkbox.checked);
            updateProgress(tasks.length, storageKey, progressId, progressTextId);
            updateStatistics();
        });

        if (checkbox.checked) {
            li.classList.add('completed');
        }

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(task));
        listEl.appendChild(li);
    });

    updateProgress(tasks.length, storageKey, progressId, progressTextId);
}

function renderAllLists() {
    renderList(dailyTasks, STORAGE_KEYS.daily, 'gunlukList', 'gunlukProgress', 'gunlukProgressText');
    renderList(weeklyTasks, STORAGE_KEYS.weekly, 'haftalikList', 'haftalikProgress', 'haftalikProgressText');
    renderList(monthlyTasks, STORAGE_KEYS.monthly, 'aylikList', 'aylikProgress', 'aylikProgressText');
    renderList(yearlyTasks, STORAGE_KEYS.yearly, 'yillikList', 'yillikProgress', 'yillikProgressText');
}

function renderRules() {
    const rulesEl = document.getElementById('rulesList');
    rulesEl.innerHTML = topRules.map(rule => `<li>✅ ${rule}</li>`).join('');

    document.getElementById('foodWarnings').innerHTML = 
        warnings.food.map(w => `<li>❌ ${w}</li>`).join('');
    document.getElementById('crohnWarnings').innerHTML = 
        warnings.crohn.map(w => `<li>❌ ${w}</li>`).join('');
    document.getElementById('timingWarnings').innerHTML = 
        warnings.timing.map(w => `<li>❌ ${w}</li>`).join('');
    document.getElementById('physicalWarnings').innerHTML = 
        warnings.physical.map(w => `<li>❌ ${w}</li>`).join('');
    document.getElementById('environmentWarnings').innerHTML = 
        warnings.environment.map(w => `<li>❌ ${w}</li>`).join('');
}

// Checkbox Handler
function handleCheckboxChange(index, storageKey, checked) {
    let savedData = JSON.parse(localStorage.getItem(storageKey) || '[]');

    if (checked && !savedData.includes(index)) {
        savedData.push(index);
    } else if (!checked) {
        savedData = savedData.filter(i => i !== index);
    }

    localStorage.setItem(storageKey, JSON.stringify(savedData));
}

// Progress Update
function updateProgress(total, storageKey, progressId, progressTextId) {
    const savedData = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const completed = savedData.length;
    const percentage = Math.round((completed / total) * 100);

    const progressBar = document.getElementById(progressId);
    const progressText = document.getElementById(progressTextId);

    if (progressBar && progressText) {
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% (${completed}/${total})`;
    }
}

function updateAllProgress() {
    updateProgress(dailyTasks.length, STORAGE_KEYS.daily, 'gunlukProgress', 'gunlukProgressText');
    updateProgress(weeklyTasks.length, STORAGE_KEYS.weekly, 'haftalikProgress', 'haftalikProgressText');
    updateProgress(monthlyTasks.length, STORAGE_KEYS.monthly, 'aylikProgress', 'aylikProgressText');
    updateProgress(yearlyTasks.length, STORAGE_KEYS.yearly, 'yillikProgress', 'yillikProgressText');
}

// Reset Functions
function resetDaily(auto = false) {
    if (!auto && !confirm('Günlük görevleri sıfırlamak istediğinize emin misiniz?')) return;
    localStorage.setItem(STORAGE_KEYS.daily, JSON.stringify([]));
    renderAllLists();
    updateStatistics();
}

function resetWeekly(auto = false) {
    if (!auto && !confirm('Haftalık görevleri sıfırlamak istediğinize emin misiniz?')) return;
    localStorage.setItem(STORAGE_KEYS.weekly, JSON.stringify([]));
    renderAllLists();
    updateStatistics();
}

function resetMonthly(auto = false) {
    if (!auto && !confirm('Aylık görevleri sıfırlamak istediğinize emin misiniz?')) return;
    localStorage.setItem(STORAGE_KEYS.monthly, JSON.stringify([]));
    renderAllLists();
    updateStatistics();
}

function resetYearly(auto = false) {
    if (!auto && !confirm('Yıllık görevleri sıfırlamak istediğinize emin misiniz?')) return;
    localStorage.setItem(STORAGE_KEYS.yearly, JSON.stringify([]));
    renderAllLists();
    updateStatistics();
}

// Notes
function saveDailyNotes() {
    const notes = document.getElementById('dailyNotes').value;
    const today = getTodayDate();
    const allNotes = JSON.parse(localStorage.getItem(STORAGE_KEYS.notes) || '{}');
    allNotes[today] = notes;
    localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(allNotes));
    alert('Not kaydedildi! ✅');
}

function loadDailyNotes() {
    const today = getTodayDate();
    const allNotes = JSON.parse(localStorage.getItem(STORAGE_KEYS.notes) || '{}');
    document.getElementById('dailyNotes').value = allNotes[today] || '';
}

// Vitals (Weight & BP)
function saveVitals() {
    const weight = parseFloat(document.getElementById('weightInput').value);
    const systolic = parseInt(document.getElementById('systolicInput').value);
    const diastolic = parseInt(document.getElementById('diastolicInput').value);
    const today = getTodayDate();

    if (weight && !isNaN(weight)) {
        const weightData = JSON.parse(localStorage.getItem(STORAGE_KEYS.weight) || '[]');
        weightData.push({ date: today, value: weight });
        localStorage.setItem(STORAGE_KEYS.weight, JSON.stringify(weightData));
        document.getElementById('weightInput').value = '';
    }

    if (systolic && diastolic && !isNaN(systolic) && !isNaN(diastolic)) {
        const bpData = JSON.parse(localStorage.getItem(STORAGE_KEYS.bp) || '[]');
        bpData.push({ date: today, systolic, diastolic });
        localStorage.setItem(STORAGE_KEYS.bp, JSON.stringify(bpData));
        document.getElementById('systolicInput').value = '';
        document.getElementById('diastolicInput').value = '';
    }

    alert('Veriler kaydedildi! ✅');
    updateStatistics();
    renderCharts();
}

// Statistics
function updateStatistics() {
    const dailyData = JSON.parse(localStorage.getItem(STORAGE_KEYS.daily) || '[]');
    const weeklyData = JSON.parse(localStorage.getItem(STORAGE_KEYS.weekly) || '[]');
    const monthlyData = JSON.parse(localStorage.getItem(STORAGE_KEYS.monthly) || '[]');
    const yearlyData = JSON.parse(localStorage.getItem(STORAGE_KEYS.yearly) || '[]');

    document.getElementById('todayComplete').textContent = 
        `${dailyData.length}/${dailyTasks.length}`;
    document.getElementById('weekComplete').textContent = 
        `${weeklyData.length}/${weeklyTasks.length}`;
    document.getElementById('monthComplete').textContent = 
        `${monthlyData.length}/${monthlyTasks.length}`;
    document.getElementById('yearComplete').textContent = 
        `${yearlyData.length}/${yearlyTasks.length}`;

    renderVitalsHistory();
    renderCharts();
}

function renderVitalsHistory() {
    const weightData = JSON.parse(localStorage.getItem(STORAGE_KEYS.weight) || '[]');
    const bpData = JSON.parse(localStorage.getItem(STORAGE_KEYS.bp) || '[]');

    const weightHistory = document.getElementById('weightHistory');
    weightHistory.innerHTML = '<h4>Son Ölçümler:</h4>';
    weightData.slice(-10).reverse().forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `<span>${formatDate(item.date)}</span><strong>${item.value} kg</strong>`;
        weightHistory.appendChild(div);
    });

    const bpHistory = document.getElementById('bpHistory');
    bpHistory.innerHTML = '<h4>Son Ölçümler:</h4>';
    bpData.slice(-10).reverse().forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `<span>${formatDate(item.date)}</span><strong>${item.systolic}/${item.diastolic}</strong>`;
        bpHistory.appendChild(div);
    });
}

function renderCharts() {
    const weightData = JSON.parse(localStorage.getItem(STORAGE_KEYS.weight) || '[]');
    const bpData = JSON.parse(localStorage.getItem(STORAGE_KEYS.bp) || '[]');

    // Simple text-based charts (you can integrate Chart.js for better visuals)
    const weightCanvas = document.getElementById('weightChart');
    const bpCanvas = document.getElementById('bpChart');

    const ctx1 = weightCanvas.getContext('2d');
    const ctx2 = bpCanvas.getContext('2d');

    // Clear canvas
    ctx1.clearRect(0, 0, weightCanvas.width, weightCanvas.height);
    ctx2.clearRect(0, 0, bpCanvas.width, bpCanvas.height);

    // Simple placeholder text
    ctx1.font = '16px Segoe UI';
    ctx1.fillStyle = '#4a9d7e';
    ctx1.textAlign = 'center';
    ctx1.fillText('Kilo grafiği için Chart.js eklenebilir', weightCanvas.width / 2, weightCanvas.height / 2);

    ctx2.font = '16px Segoe UI';
    ctx2.fillStyle = '#4a9d7e';
    ctx2.textAlign = 'center';
    ctx2.fillText('Tansiyon grafiği için Chart.js eklenebilir', bpCanvas.width / 2, bpCanvas.height / 2);
}

// Export/Import
function exportData() {
    const data = {
        daily: localStorage.getItem(STORAGE_KEYS.daily),
        weekly: localStorage.getItem(STORAGE_KEYS.weekly),
        monthly: localStorage.getItem(STORAGE_KEYS.monthly),
        yearly: localStorage.getItem(STORAGE_KEYS.yearly),
        notes: localStorage.getItem(STORAGE_KEYS.notes),
        weight: localStorage.getItem(STORAGE_KEYS.weight),
        bp: localStorage.getItem(STORAGE_KEYS.bp),
        lastReset: localStorage.getItem(STORAGE_KEYS.lastReset)
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `saglik-takip-yedek-${getTodayDate()}.json`;
    a.click();
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            Object.keys(data).forEach(key => {
                if (data[key]) {
                    localStorage.setItem(`healthTrack_${key}`, data[key]);
                }
            });
            alert('Veriler başarıyla yüklendi! ✅');
            location.reload();
        } catch (error) {
            alert('Hata: Geçersiz dosya formatı!');
        }
    };
    reader.readAsText(file);
}