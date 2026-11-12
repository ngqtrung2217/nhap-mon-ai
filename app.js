/* IT3160 practice app — vanilla JS, no dependencies. */
(function () {
  'use strict';

  var STORE_KEY = 'it3160_quiz_v1';
  var TOPICS = [
    { id: 'l1', code: 'L1', name: 'Giới thiệu TTNT', sub: 'Định nghĩa · Turing · lịch sử' },
    { id: 'l2', code: 'L2', name: 'Tác tử thông minh', sub: 'PEAS · môi trường · kiến trúc' },
    { id: 'l3', code: 'L3', name: 'Tìm kiếm cơ bản', sub: 'BFS · UCS · DFS · DLS · IDS' },
    { id: 'l4', code: 'L4', name: 'Tìm kiếm có tri thức bổ sung', sub: 'Heuristic · A* · cục bộ · GA' },
    { id: 'l5', code: 'L5', name: 'Tìm kiếm đối kháng', sub: 'Minimax · Alpha–Beta' },
    { id: 'l6', code: 'L6', name: 'Thỏa mãn ràng buộc', sub: 'Backtracking · AC-3 · min-conflicts' },
    { id: 'l8', code: 'L8', name: 'Biểu diễn tri thức', sub: 'Luật · khung · mạng ngữ nghĩa · ontology' }
  ];
  var TOPIC_BY_ID = {};
  TOPICS.forEach(function (t) { TOPIC_BY_ID[t.id] = t; });

  var BANK = (window.QUIZ_BANK || []).filter(function (q) {
    return q && q.id && q.q && TOPIC_BY_ID[q.t] && Array.isArray(q.o) && q.o.length >= 2 && Array.isArray(q.a) && q.a.length > 0;
  });
  var BY_ID = new Map();
  BANK.forEach(function (q) { BY_ID.set(q.id, q); });

  function $(sel, el) { return (el || document).querySelector(sel); }
  function $$(sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); }
  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function optLabel(i) { return String(i + 1); }
  function setsEqual(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    var A = a.slice().sort(function (x, y) { return x - y; });
    var B = b.slice().sort(function (x, y) { return x - y; });
    return A.every(function (v, i) { return v === B[i]; });
  }
  function fmtTime(sec) {
    var m = Math.floor(sec / 60), s = Math.round(sec % 60);
    return m + ':' + String(s).padStart(2, '0');
  }
  function fmtDate(ts) {
    try {
      return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(ts));
    } catch (e) { return ''; }
  }
  function pickFor(q) { return q.type === 'multi' ? (q.pick || q.a.length) : 1; }

  function figureSvg(fig) {
    if (!fig || !fig.nodes || !fig.nodes.length) return '';
    var w = fig.w || 360, h = fig.h || 220;
    var byId = {};
    fig.nodes.forEach(function (n) { byId[n.id] = n; });
    var parts = [];
    (fig.edges || []).forEach(function (e) {
      var a = byId[e.a], b = byId[e.b];
      if (!a || !b) return;
      parts.push('<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" stroke="currentColor" stroke-width="1.2"/>');
      if (e.label) {
        parts.push('<text class="fig-edge" x="' + ((a.x + b.x) / 2) + '" y="' + ((a.y + b.y) / 2 - 3) + '" text-anchor="middle">' + esc(e.label) + '</text>');
      }
    });
    fig.nodes.forEach(function (n) {
      var r = n.r || 18;
      parts.push('<circle cx="' + n.x + '" cy="' + n.y + '" r="' + r + '" fill="var(--surface)" stroke="currentColor" stroke-width="1.2"/>');
      parts.push('<text class="fig-label" x="' + n.x + '" y="' + (n.y + 3) + '" text-anchor="middle">' + esc(n.label || n.id) + '</text>');
    });
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Hình vẽ minh họa của câu hỏi">' + parts.join('') + '</svg>';
  }

  function defaultState() {
    return { stats: {}, wrong: [], marks: [], history: [], settings: { shuffleQ: true, shuffleO: true, theme: 'auto' } };
  }
  function loadState() {
    var base = defaultState();
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return base;
      var p = JSON.parse(raw) || {};
      return {
        stats: p.stats || {},
        wrong: Array.isArray(p.wrong) ? p.wrong : [],
        marks: Array.isArray(p.marks) ? p.marks : [],
        history: Array.isArray(p.history) ? p.history : [],
        settings: Object.assign({}, base.settings, p.settings || {})
      };
    } catch (e) { return base; }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
  }
  var state = loadState();
  if (!Array.isArray(state.history)) state.history = [];
  state.wrong = Array.from(new Set(state.wrong || [])).filter(function (id) { return BY_ID.has(id); });
  state.marks = Array.from(new Set(state.marks || [])).filter(function (id) { return BY_ID.has(id); });

  function overallStats() {
    var attempts = 0, correct = 0, seen = 0;
    BANK.forEach(function (q) {
      var s = state.stats[q.id];
      if (s && s.seen) { seen++; attempts += s.seen; correct += s.correct || 0; }
    });
    return { attempts: attempts, correct: correct, seen: seen, acc: attempts ? Math.round(correct / attempts * 100) : 0 };
  }
  function topicStats(tid) {
    var qs = BANK.filter(function (q) { return q.t === tid; });
    var seen = 0, attempts = 0, correct = 0;
    qs.forEach(function (q) {
      var s = state.stats[q.id];
      if (s && s.seen) { seen++; attempts += s.seen; correct += s.correct || 0; }
    });
    return { total: qs.length, seen: seen, attempts: attempts, correct: correct, acc: attempts ? Math.round(correct / attempts * 100) : 0 };
  }

  var session = null;
  var toastTimer = null;
  var modalOk = null;
  var CHEVRON = '<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';

  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2200);
  }
  function openConfirm(title, text, okLabel, onOk) {
    $('#modal-title').textContent = title;
    $('#modal-text').textContent = text;
    $('#modal-ok').textContent = okLabel || 'Đồng ý';
    modalOk = onOk;
    $('#modal').hidden = false;
    setTimeout(function () { $('#modal-cancel').focus(); }, 20);
  }
  function closeModal() { $('#modal').hidden = true; modalOk = null; }

  function renderHome() {
    var o = overallStats();
    $('#total-count').textContent = String(BANK.length);
    $('#stat-done').textContent = String(o.seen);
    $('#stat-acc').textContent = o.acc + '%';
    $('#stat-wrong').textContent = String(state.wrong.length);
    $('#wrong-count-label').textContent = state.wrong.length ? state.wrong.length + ' câu cần ôn lại' : 'Chưa có câu sai';
    $('#marked-count-label').textContent = state.marks.length ? state.marks.length + ' câu đã đánh dấu' : 'Chưa đánh dấu câu nào';
    $('#topic-list').innerHTML = TOPICS.map(function (t) {
      var s = topicStats(t.id);
      var pct = s.total ? Math.round(s.seen / s.total * 100) : 0;
      return '<button class="topic-row" type="button" data-topic="' + t.id + '">' +
        '<span class="topic-code">' + t.code + '</span>' +
        '<span class="topic-info">' +
          '<span class="topic-name"><span>' + esc(t.name) + '</span><span class="topic-count">' + s.total + ' câu</span></span>' +
          '<span class="topic-sub">' + esc(t.sub) + ' · đã làm ' + s.seen + '/' + s.total + '</span>' +
          '<span class="meter"><span class="meter-fill" style="width:' + pct + '%"></span></span>' +
        '</span>' + CHEVRON + '</button>';
    }).join('');
    var examHost = $('#exam-list');
    if (examHost) {
      var sets = (window.EXAM_SETS || []).filter(function (s) {
        return s && s.id && s.ids && s.ids.length;
      });
      examHost.innerHTML = sets.map(function (s) {
        var n = s.ids.filter(function (qid) { return BY_ID.has(qid); }).length;
        return '<button class="topic-row" type="button" data-exam="' + esc(s.id) + '">' +
          '<span class="topic-code">' + esc(s.code) + '</span>' +
          '<span class="topic-info">' +
            '<span class="topic-name"><span>' + esc(s.name) + '</span><span class="topic-count">' + n + ' câu</span></span>' +
            '<span class="topic-sub">' + esc(s.sub || '30 câu · 45 phút') + '</span>' +
          '</span>' + CHEVRON + '</button>';
      }).join('');
    }
  }

  function renderProgress() {
    var o = overallStats();
    $('#p-seen').textContent = String(o.seen);
    $('#p-attempts').textContent = String(o.attempts);
    $('#p-acc').textContent = o.acc + '%';
    $('#p-wrong').textContent = String(state.wrong.length);
    $('#progress-bars').innerHTML = TOPICS.map(function (t) {
      var s = topicStats(t.id);
      var pct = s.attempts ? s.acc : 0;
      var right = s.attempts ? s.seen + '/' + s.total + ' câu · ' + s.acc + '%' : 'Chưa làm';
      return '<div class="bar-row"><div class="bar-label"><span>' + t.code + ' · ' + esc(t.name) + '</span><span>' + right + '</span></div>' +
        '<div class="bar-track"><div class="bar-fill" style="width:' + pct + '%"></div></div></div>';
    }).join('');
    $('#history-list').innerHTML = state.history.length ? state.history.map(function (h) {
      return '<div class="history-row"><div class="history-main"><span class="history-title">' + esc(h.title) + '</span>' +
        '<span class="history-sub">' + fmtDate(h.ts) + ' · ' + fmtTime(h.seconds || 0) + '</span></div>' +
        '<span class="history-score">' + h.correct + '/' + h.total + '</span></div>';
    }).join('') : '<div class="empty-note">Chưa có phiên luyện nào. Thử 10 câu ngẫu nhiên ở trang chủ.</div>';
    $$('[data-setting]').forEach(function (b) { b.setAttribute('aria-checked', String(!!state.settings[b.dataset.setting])); });
    $$('[data-theme-set]').forEach(function (b) { b.classList.toggle('active', b.dataset.themeSet === (state.settings.theme || 'auto')); });
    var totalEl = $('#footnote-total');
    if (totalEl) totalEl.textContent = String(BANK.length);
  }

  function renderTheory() {
    var host = $('#theory-list');
    if (!host) return;
    var sections = window.THEORY || [];
    if (!sections.length) {
      host.innerHTML = '<div class="empty-note">Chưa tải được nội dung lý thuyết.</div>';
      return;
    }
    host.innerHTML = sections.map(function (sec, i) {
      return '<details class="theory-card"' + (i === 0 ? ' open' : '') + '>' +
        '<summary><span class="topic-code">' + esc(sec.code) + '</span>' +
        '<span class="summary-text"><span class="summary-title">' + esc(sec.title) + '</span>' +
        '<span class="summary-sub">' + esc(sec.sub) + '</span></span>' + CHEVRON + '</summary>' +
        '<div class="theory-body">' + sec.body + '</div></details>';
    }).join('');
  }

  function showView(name) {
    $$('.view').forEach(function (v) { v.hidden = v.id !== 'view-' + name; });
    $('#app').dataset.view = name;
    var chrome = name === 'home' || name === 'theory' || name === 'progress';
    $('#topbar').hidden = !chrome;
    $('#tabbar').hidden = !chrome;
    $$('#tabbar .tab').forEach(function (b) { b.classList.toggle('active', b.dataset.viewTarget === name); });
    if (name === 'home') renderHome();
    if (name === 'theory' && !$('#theory-list').children.length) renderTheory();
    if (name === 'progress') renderProgress();
    window.scrollTo(0, 0);
  }

  function applyTheme() {
    var t = state.settings.theme || 'auto';
    if (t === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
    var label = t === 'auto' ? 'theo hệ thống' : (t === 'dark' ? 'tối' : 'sáng');
    var btn = $('#theme-btn');
    if (btn) btn.setAttribute('aria-label', 'Giao diện: ' + label + '. Bấm để đổi.');
    $$('[data-theme-set]').forEach(function (b) { b.classList.toggle('active', b.dataset.themeSet === t); });
  }
  function cycleTheme() {
    var order = ['auto', 'light', 'dark'];
    var i = order.indexOf(state.settings.theme || 'auto');
    state.settings.theme = order[(i + 1) % 3];
    save(); applyTheme();
    var names = { auto: 'Theo hệ thống', light: 'Sáng', dark: 'Tối' };
    toast('Giao diện: ' + names[state.settings.theme]);
  }

  function buildItem(q) {
    var order = q.o.map(function (_, i) { return i; });
    if (state.settings.shuffleO) shuffle(order);
    var ans = q.a.map(function (ai) { return order.indexOf(ai); }).filter(function (i) { return i >= 0; }).sort(function (a, b) { return a - b; });
    return { q: q, order: order, ans: ans };
  }

  function startSession(qs, opts) {
    if (!qs.length) { toast('Chưa có câu hỏi phù hợp.'); return; }
    if (session && session.timerId) { clearInterval(session.timerId); }
    var fixed = !!opts.fixed;
    session = {
      items: qs.map(fixed ? function (q) {
        return { q: q, order: q.o.map(function (_, i) { return i; }), ans: q.a.slice() };
      } : buildItem),
      idx: 0,
      answers: new Array(qs.length).fill(null),
      mode: opts.mode || 'practice',
      title: opts.title || 'Luyện tập',
      started: Date.now(),
      limit: opts.limit || 0,
      remaining: opts.limit || 0,
      timerId: null,
      finished: false
    };
    $('#quiz-timer').hidden = !(session.mode === 'exam' && session.limit);
    showView('quiz');
    renderQuiz();
    if (session.mode === 'exam' && session.limit) startTimer();
  }

  function startQuick() {
    var unseen = BANK.filter(function (q) { return !(state.stats[q.id] && state.stats[q.id].seen); });
    var seen = BANK.filter(function (q) { return state.stats[q.id] && state.stats[q.id].seen; });
    var pool = shuffle(unseen.slice()).concat(shuffle(seen.slice()));
    startSession(pool.slice(0, Math.min(10, pool.length)), { mode: 'practice', title: 'Luyện nhanh 10 câu' });
  }
  function startExam() {
    var qs = shuffle(BANK.slice()).slice(0, Math.min(20, BANK.length));
    startSession(qs, { mode: 'exam', title: 'Thi thử 20 câu', limit: 20 * 60 });
  }
  function startExamSet(id) {
    var sets = window.EXAM_SETS || [];
    var set = null;
    for (var i = 0; i < sets.length; i++) {
      if (sets[i].id === id) { set = sets[i]; break; }
    }
    if (!set) return;
    var qs = set.ids.map(function (qid) { return BY_ID.get(qid); }).filter(Boolean);
    if (!qs.length) { toast('Đề chưa có câu hỏi.'); return; }
    startSession(qs, { mode: 'exam', title: set.code + ' · ' + set.name, limit: 45 * 60, fixed: true });
  }
  function startTopic(id) {
    var t = TOPIC_BY_ID[id];
    if (!t) return;
    var qs = BANK.filter(function (q) { return q.t === id; });
    var ordered = state.settings.shuffleQ ? shuffle(qs.slice()) : qs.slice();
    startSession(ordered, { mode: 'practice', title: t.code + ' · ' + t.name });
  }
  function startWrong() {
    var qs = state.wrong.map(function (id) { return BY_ID.get(id); }).filter(Boolean);
    if (!qs.length) { toast('Chưa có câu sai. Làm vài câu trước nhé.'); return; }
    startSession(shuffle(qs.slice()), { mode: 'practice', title: 'Ôn câu sai' });
  }
  function startMarked() {
    var qs = state.marks.map(function (id) { return BY_ID.get(id); }).filter(Boolean);
    if (!qs.length) { toast('Chưa đánh dấu câu nào.'); return; }
    startSession(shuffle(qs.slice()), { mode: 'practice', title: 'Câu đã đánh dấu' });
  }

  function startTimer() {
    updateTimer();
    session.timerId = setInterval(function () {
      if (!session) return;
      session.remaining--;
      if (session.remaining <= 0) {
        clearInterval(session.timerId);
        session.timerId = null;
        finishSession();
        return;
      }
      updateTimer();
    }, 1000);
  }
  function updateTimer() {
    var el = $('#quiz-timer');
    if (!session || !session.limit) { el.hidden = true; return; }
    el.hidden = false;
    var r = Math.max(0, session.remaining);
    el.textContent = Math.floor(r / 60) + ':' + String(r % 60).padStart(2, '0');
  }

  function isChecked() {
    var a = session.answers[session.idx];
    return !!(a && a.ok !== null);
  }
  function setProgress() {
    var done = session.idx + (isChecked() ? 1 : 0);
    $('#quiz-progress').style.width = (done / session.items.length * 100) + '%';
  }
  function updateMark() {
    var q = session.items[session.idx].q;
    var marked = state.marks.indexOf(q.id) >= 0;
    var b = $('#quiz-mark');
    b.classList.toggle('active', marked);
    b.setAttribute('aria-pressed', String(marked));
    b.setAttribute('aria-label', marked ? 'Bỏ đánh dấu câu hỏi' : 'Đánh dấu câu hỏi');
  }

  function renderQuiz() {
    if (!session) return;
    var item = session.items[session.idx];
    var q = item.q;
    $('#quiz-topic').textContent = session.title;
    $('#quiz-count').textContent = 'Câu ' + (session.idx + 1) + '/' + session.items.length;
    $('#quiz-chip').textContent = pickFor(q) > 1 ? 'Chọn ' + pickFor(q) + ' đáp án' : 'Một đáp án';
    $('#quiz-question').textContent = q.q;
    var secEl = $('#quiz-section');
    if (secEl) {
      secEl.textContent = q.sec || '';
      secEl.hidden = !q.sec;
    }
    var figEl = $('#quiz-figure');
    if (figEl) {
      var svg = figureSvg(q.fig);
      figEl.innerHTML = svg;
      figEl.hidden = !svg;
    }
    $('#quiz-options').innerHTML = item.order.map(function (oi, di) {
      return '<button class="option" type="button" data-i="' + di + '" aria-pressed="false">' +
        '<span class="option-letter">' + optLabel(di) + '</span>' +
        '<span class="option-text">' + esc(q.o[oi]) + '</span></button>';
    }).join('');
    var fb = $('#quiz-feedback');
    fb.hidden = true; fb.className = 'feedback'; fb.innerHTML = '';
    updateMark();
    paintOptions();
    updateAction();
    setProgress();
    window.scrollTo(0, 0);
  }

  function paintOptions() {
    var item = session.items[session.idx];
    var ans = session.answers[session.idx];
    var checked = !!(ans && ans.ok !== null);
    $$('#quiz-options .option').forEach(function (btn) {
      var di = Number(btn.dataset.i);
      var isSel = !!(ans && ans.sel.indexOf(di) >= 0);
      var isCorr = item.ans.indexOf(di) >= 0;
      btn.classList.toggle('selected', isSel && !checked);
      btn.classList.toggle('correct', checked && isCorr);
      btn.classList.toggle('wrong', checked && isSel && !isCorr);
      btn.classList.toggle('muted', checked && !isCorr && !isSel);
      btn.classList.toggle('locked', checked);
      btn.setAttribute('aria-pressed', String(isSel));
    });
  }

  function updateAction() {
    var item = session.items[session.idx];
    var q = item.q;
    var ans = session.answers[session.idx];
    var checked = !!(ans && ans.ok !== null);
    var btn = $('#quiz-action');
    var hint = $('#quiz-hint');
    var last = session.idx === session.items.length - 1;
    if (session.mode === 'practice') {
      if (checked) {
        btn.textContent = last ? 'Xem kết quả' : 'Câu tiếp';
        btn.disabled = false;
        hint.textContent = ans.ok ? 'Đã ghi nhận câu trả lời đúng.' : 'Đã ghi nhận câu trả lời sai.';
      } else {
        var n = ans ? ans.sel.length : 0;
        var need = pickFor(q);
        btn.textContent = 'Kiểm tra';
        btn.disabled = n !== need;
        hint.textContent = need > 1 ? 'Đã chọn ' + n + '/' + need + ' đáp án' : 'Chọn một đáp án';
      }
    } else {
      btn.textContent = last ? 'Nộp bài' : 'Tiếp';
      btn.disabled = false;
      hint.textContent = 'Có thể bỏ qua câu này.';
    }
    setProgress();
  }

  function toggleOption(di) {
    var item = session.items[session.idx];
    var q = item.q;
    var ans = session.answers[session.idx];
    if (ans && ans.ok !== null) return;
    if (!ans) ans = { sel: [], ok: null };
    var need = pickFor(q);
    if (need === 1) {
      ans.sel = [di];
    } else {
      var pos = ans.sel.indexOf(di);
      if (pos >= 0) ans.sel.splice(pos, 1);
      else {
        if (ans.sel.length >= need) { toast('Chỉ chọn ' + need + ' đáp án.'); return; }
        ans.sel.push(di);
      }
      ans.sel.sort(function (a, b) { return a - b; });
    }
    session.answers[session.idx] = ans;
    paintOptions();
    updateAction();
  }

  function record(qid, ok) {
    var s = state.stats[qid] || { seen: 0, correct: 0 };
    s.seen++;
    if (ok) s.correct++;
    state.stats[qid] = s;
    var i = state.wrong.indexOf(qid);
    if (ok) { if (i >= 0) state.wrong.splice(i, 1); }
    else if (i < 0) state.wrong.push(qid);
    save();
  }

  function renderFeedback() {
    var item = session.items[session.idx];
    var ans = session.answers[session.idx];
    var fb = $('#quiz-feedback');
    var your = ans.sel.map(function (i) { return optLabel(i); }).join(', ');
    var right = item.ans.map(function (i) { return optLabel(i); }).join(', ');
    fb.hidden = false;
    fb.className = 'feedback ' + (ans.ok ? 'good' : 'bad');
    fb.innerHTML = '<div class="feedback-title">' + (ans.ok ? 'Chính xác' : 'Chưa đúng') + '</div>' +
      '<p class="feedback-copy">' + esc(item.q.e) + '</p>' +
      '<p class="feedback-answer">Đáp án đúng: <b>' + right + '</b>' + (ans.ok ? '' : ' · Bạn chọn: ' + your) + '</p>';
    setTimeout(function () {
      if (fb.hidden) return;
      fb.scrollIntoView({ block: 'nearest', behavior: REDUCED ? 'auto' : 'smooth' });
    }, 60);
  }

  function checkCurrent() {
    var item = session.items[session.idx];
    var q = item.q;
    var ans = session.answers[session.idx];
    if (!ans || ans.sel.length !== pickFor(q)) return;
    ans.ok = setsEqual(ans.sel, item.ans);
    session.answers[session.idx] = ans;
    record(q.id, ans.ok);
    paintOptions();
    renderFeedback();
    updateAction();
  }

  function advance() {
    if (!session) return;
    if (session.mode === 'exam') {
      var item = session.items[session.idx];
      var ans = session.answers[session.idx] || { sel: [], ok: null };
      if (ans.ok === null) ans.ok = setsEqual(ans.sel, item.ans);
      session.answers[session.idx] = ans;
    }
    if (session.idx >= session.items.length - 1) { finishSession(); return; }
    session.idx++;
    renderQuiz();
  }

  function quizAction() {
    if (!session) return;
    if (session.mode === 'practice') {
      if (isChecked()) { advance(); return; }
      var item = session.items[session.idx];
      var ans = session.answers[session.idx];
      var need = pickFor(item.q);
      if (!ans || ans.sel.length !== need) {
        toast('Chọn ' + need + ' đáp án trước khi kiểm tra.');
        return;
      }
      checkCurrent();
    } else {
      advance();
    }
  }

  function finishSession() {
    if (!session || session.finished) return;
    session.finished = true;
    if (session.timerId) { clearInterval(session.timerId); session.timerId = null; }
    if (session.mode === 'exam') {
      session.items.forEach(function (it, i) {
        var a = session.answers[i] || { sel: [], ok: null };
        if (a.ok === null) a.ok = setsEqual(a.sel, it.ans);
        session.answers[i] = a;
        record(it.q.id, a.ok);
      });
    }
    var total = session.items.length;
    var correct = session.items.reduce(function (n, it, i) {
      return n + ((session.answers[i] && session.answers[i].ok) ? 1 : 0);
    }, 0);
    var seconds = Math.max(1, Math.round((Date.now() - session.started) / 1000));
    state.history.unshift({ ts: Date.now(), mode: session.mode, title: session.title, total: total, correct: correct, seconds: seconds });
    state.history = state.history.slice(0, 20);
    save();
    renderResult();
    showView('result');
  }

  function renderResult() {
    if (!session) return;
    var total = session.items.length;
    var correct = session.items.reduce(function (n, it, i) {
      return n + ((session.answers[i] && session.answers[i].ok) ? 1 : 0);
    }, 0);
    var wrong = total - correct;
    var pct = total ? Math.round(correct / total * 100) : 0;
    $('#result-title').textContent = session.title;
    $('#result-sub').textContent = (session.mode === 'exam' ? 'Thi thử' : 'Luyện tập') + ' · ' + total + ' câu · ' + fmtDate(session.started);
    $('#result-percent').textContent = pct + '%';
    $('#result-correct').textContent = correct + '/' + total;
    $('#result-time').textContent = fmtTime(Math.max(1, Math.round((Date.now() - session.started) / 1000)));
    $('#result-wrong').textContent = String(wrong);
    var C = 2 * Math.PI * 54;
    var ring = $('#ring-fill');
    ring.style.strokeDasharray = String(C);
    ring.style.strokeDashoffset = String(C * (1 - (total ? correct / total : 0)));
    ring.style.stroke = 'var(--accent)';

    var groups = new Map();
    session.items.forEach(function (it, i) {
      var g = groups.get(it.q.t) || { total: 0, correct: 0 };
      g.total++;
      if (session.answers[i] && session.answers[i].ok) g.correct++;
      groups.set(it.q.t, g);
    });
    var topicSection = $('#result-topic-section');
    if (groups.size < 2) {
      topicSection.hidden = true;
    } else {
      topicSection.hidden = false;
      $('#result-bars').innerHTML = Array.from(groups.entries()).map(function (pair) {
        var tid = pair[0], g = pair[1];
        var t = TOPIC_BY_ID[tid] || { code: tid, name: tid };
        var p = Math.round(g.correct / g.total * 100);
        return '<div class="bar-row"><div class="bar-label"><span>' + t.code + ' · ' + esc(t.name) + '</span><span>' + g.correct + '/' + g.total + ' · ' + p + '%</span></div>' +
          '<div class="bar-track"><div class="bar-fill" style="width:' + p + '%"></div></div></div>';
      }).join('');
    }

    var wrongItems = session.items.map(function (it, i) { return { it: it, i: i, a: session.answers[i] }; }).filter(function (x) {
      return !x.a || !x.a.ok;
    });
    $('#result-review-count').textContent = wrongItems.length ? wrongItems.length + ' câu' : 'Không có';
    $('#result-review').innerHTML = wrongItems.length ? wrongItems.map(function (x) {
      var selTxt = x.a && x.a.sel.length ? x.a.sel.map(function (k) { return optLabel(k); }).join(', ') : 'Chưa trả lời';
      var ansTxt = x.it.ans.map(function (k) { return optLabel(k); }).join(', ');
      return '<article class="review-item"><p class="review-num">Câu ' + (x.i + 1) + '</p>' +
        '<p class="review-q">' + esc(x.it.q.q) + '</p>' +
        '<div class="review-line"><span>Bạn chọn</span><b class="bad-text">' + selTxt + '</b></div>' +
        '<div class="review-line"><span>Đáp án</span><b class="good-text">' + ansTxt + '</b></div>' +
        '<p class="review-explain">' + esc(x.it.q.e) + '</p></article>';
    }).join('') : '<div class="empty-note">Không có câu sai trong phiên này.</div>';
    var retry = $('#retry-wrong');
    if (!wrongItems.length) {
      retry.disabled = true;
      retry.onclick = null;
    } else {
      retry.disabled = false;
      retry.onclick = function () {
        var qs = wrongItems.map(function (x) { return x.it.q; });
        startSession(shuffle(qs.slice()), { mode: 'practice', title: 'Luyện lại câu sai' });
      };
    }
    $('#result-home').onclick = function () { showView('home'); };
  }

  function exitQuiz() {
    if (!session) { showView('home'); return; }
    var answered = session.answers.some(function (a) { return a && a.sel.length; });
    if (!answered) { leaveQuiz(); return; }
    openConfirm('Thoát bài luyện?', 'Các câu đã kiểm tra vẫn được ghi nhận, nhưng phiên hiện tại sẽ không có kết quả tổng kết.', 'Thoát', leaveQuiz);
  }
  function leaveQuiz() {
    if (session && session.timerId) clearInterval(session.timerId);
    session = null;
    showView('home');
  }

  function bindEvents() {
    document.addEventListener('click', function (e) {
      var view = e.target.closest('[data-view-target]');
      if (view) { e.preventDefault(); showView(view.dataset.viewTarget); return; }
      var mode = e.target.closest('[data-mode]');
      if (mode) {
        var m = mode.dataset.mode;
        if (m === 'quick') startQuick();
        else if (m === 'exam') startExam();
        else if (m === 'wrong') startWrong();
        else if (m === 'marked') startMarked();
        return;
      }
      var topic = e.target.closest('[data-topic]');
      if (topic) { startTopic(topic.dataset.topic); return; }
      var examSet = e.target.closest('[data-exam]');
      if (examSet) { startExamSet(examSet.dataset.exam); return; }
      var sw = e.target.closest('[data-setting]');
      if (sw) {
        var key = sw.dataset.setting;
        state.settings[key] = !state.settings[key];
        sw.setAttribute('aria-checked', String(!!state.settings[key]));
        save();
        toast(state.settings[key] ? 'Đã bật' : 'Đã tắt');
        return;
      }
      var th = e.target.closest('[data-theme-set]');
      if (th) {
        state.settings.theme = th.dataset.themeSet;
        save(); applyTheme(); toast('Đã đổi giao diện');
      }
    });
    $('#quiz-exit').addEventListener('click', exitQuiz);
    $('#quiz-mark').addEventListener('click', function () {
      if (!session) return;
      var id = session.items[session.idx].q.id;
      var i = state.marks.indexOf(id);
      if (i >= 0) state.marks.splice(i, 1); else state.marks.push(id);
      save(); updateMark();
      toast(i >= 0 ? 'Đã bỏ đánh dấu' : 'Đã đánh dấu câu hỏi');
    });
    $('#quiz-options').addEventListener('click', function (e) {
      var b = e.target.closest('.option');
      if (!b || !session) return;
      toggleOption(Number(b.dataset.i));
    });
    $('#quiz-action').addEventListener('click', quizAction);
    $('#theme-btn').addEventListener('click', cycleTheme);
    $('#modal-cancel').addEventListener('click', closeModal);
    $('#modal-ok').addEventListener('click', function () {
      var fn = modalOk;
      closeModal();
      if (fn) fn();
    });
    document.addEventListener('click', function (e) {
      if (e.target.matches('[data-modal-cancel]')) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !$('#modal').hidden) { closeModal(); return; }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (!$('#modal').hidden) return;
      if ($('#view-quiz').hidden || !session) return;
      var target = e.target;
      var tag = target && target.tagName ? target.tagName : '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (target && target.isContentEditable)) return;
      var map = { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4 };
      var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (Object.prototype.hasOwnProperty.call(map, key)) {
        var options = $$('#quiz-options .option');
        var idx = map[key];
        if (idx < options.length) {
          e.preventDefault();
          toggleOption(idx);
        }
        return;
      }
      if (e.key === 'Enter') {
        var ae = document.activeElement;
        var isOption = ae && ae.classList && ae.classList.contains('option');
        var isOtherControl = ae && (ae.tagName === 'BUTTON' || ae.tagName === 'A' || ae.tagName === 'SUMMARY') && !isOption;
        if (isOtherControl) return;
        e.preventDefault();
        quizAction();
      }
    });
    $('#reset-btn').addEventListener('click', function () {
      openConfirm('Xóa toàn bộ tiến độ?', 'Câu đã làm, câu sai, đánh dấu và lịch sử sẽ bị xóa. Không thể hoàn tác.', 'Xóa', function () {
        state.stats = {}; state.wrong = []; state.marks = []; state.history = [];
        save(); renderProgress(); renderHome(); toast('Đã xóa tiến độ');
      });
    });
  }

  function init() {
    applyTheme();
    bindEvents();
    if (!BANK.length) {
      $('#topic-list').innerHTML = '<div class="empty-note">Không tải được ngân hàng câu hỏi.</div>';
      $('#total-count').textContent = '0';
      return;
    }
    renderTheory();
    showView('home');
  }

  init();
})();
