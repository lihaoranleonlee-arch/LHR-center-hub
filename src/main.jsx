import React, { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Mail, Phone, MapPin, Sparkles, Workflow, ScanSearch, Globe2 } from 'lucide-react';
import './style.css';
import MicroSlats from './MicroSlats.jsx';
import SpecularSurface from './SpecularSurface.jsx';
import SiteHeader, { CONTACT_NAV_INDEX, publicAsset } from './SiteHeader.jsx';
const SlingButton = lazy(() => import('./components/SlingButton.jsx'));
gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: '01', type: 'AI PRODUCT · INTERNAL TOOL', title: '企业智选协同平台', summary: '把客户需求、产品规则与方案流转，串成一条可解释、可追溯的工作流。', detail: '针对产品资料分散、客户需求描述不完整、选型依赖个人经验及对外承诺风险，梳理销售、产品经理、测试、运维 4 类目标角色，设计“需求录入 > 规则匹配 > 推荐理由与风险 > 人工确认 > 方案保存 / 导出 >> 反馈沉淀”业务闭环。', tags: ['产品策略', 'CRM', '企业辅助平台'], image: 'project-platform.png', href: 'https://leon-nexus-product-hub.app.workbuddy.host/?sharecode=CPBXQETQHP' },
  { id: '02', type: 'RAG · KNOWLEDGE SYSTEM', title: '企业知识库 AI 助手', summary: '从产品资料治理出发，构建有来源、有边界的企业问答体验。', detail: '规划 AI Agent 问答路径、Prompt 和知识库结构，搭建功能性 Skill，整理统一产品参数口径，给新客一个快速了解公司产品及文化的对话窗口，同时给内部员工一个主观与“企业”对话的渠道。', tags: ['AI Agent', 'RAG', '答疑助手'], image: 'project-knowledge-base.png', href: 'https://leon-nexus-product-hub.app.workbuddy.host/knowledge.html?sharecode=CPBXQETQHP&embed=1' },
  {
    id: '03',
    title: 'AI辅助ID工作流',
    summary: '从草图到结构验证，用 AI 扩大造型探索、加快材质对比，关键设计和工程判断由人完成。',
    image: 'project-id-workflow.png',
    steps: [
      {
        title: '草图', english: 'SKETCH',
        detail: '按产品定义和尺寸约束手绘，推敲体量、握持和风道，产出 3–5 个形态方向。此步不使用 AI。',
      },
      {
        title: 'AI 模拟', english: 'AI SIMULATION',
        detail: '将草图转成提示词，用 AI 生成约 8 个配色、材质与造型组合，筛掉明显不可行的方向。',
      },
      {
        title: '方案建模', english: 'MODELING',
        detail: '选 1–2 个方向精确建模，确定曲率、分模线、按键和接口。AI 不参与建模。',
      },
      {
        title: 'AI 修正', english: 'AI CORRECTION',
        detail: '用图生图对比色差、哑光与亮面、金属环位置，减少反复渲染，一天可对比十几版。',
      },
      {
        title: '结构验证', english: 'VALIDATION',
        detail: '由结构工程师检查壁厚、拔模角、装配顺序和风道干涉，发现可制造性问题就退回修改。',
      },
    ],
  }
];
const abilities = [
  { n: '01', title: '把复杂需求理清楚', text: '从业务目标出发，拆解角色任务、流程、规则、数据字段与异常边界。', Icon: ScanSearch },
  { n: '02', title: '让 AI 进入真实工作流', text: '理解 Prompt、RAG 与知识治理，关注来源引用、拒答、人工复核和 badcase。', Icon: Sparkles },
  { n: '03', title: '建立可协作的数据语言', text: '梳理对象模型、状态、指标口径和 CRM 协同，让方案可以持续验证。', Icon: Workflow },
  { n: '04', title: '连接不同专业的人', text: '在设计、研发、供应链与市场之间建立共识，推动体验和业务一起落地。', Icon: Globe2 }
];

function App() {
  const motionRootRef = useRef(null);
  const [isFloating, setIsFloating] = useState(false);
  const [activeNav, setActiveNav] = useState(0);
  useEffect(() => {
    const hero = document.querySelector('.hero');
    if (!hero) return undefined;
    const observer = new IntersectionObserver(([entry]) => setIsFloating(entry.intersectionRatio < 0.2), { threshold: [0, 0.2, 1] });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const sections = [
      { selector: '#about', index: 0 },
      { selector: '#strengths', index: 1 },
      { selector: '#overseas-experience', index: 1 },
      { selector: '#core-capabilities', index: 1 },
      { selector: '#toolkit', index: 1 },
      { selector: '#work', index: 2 },
      { selector: '#contact', index: CONTACT_NAV_INDEX }
    ].map(item => ({ ...item, element: document.querySelector(item.selector) })).filter(item => item.element);
    let frame = 0;
    const syncActiveSection = () => {
      frame = 0;
      const marker = window.scrollY + window.innerHeight * 0.42;
      let next = 0;
      for (const section of sections) {
        const top = section.element.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) next = section.index;
      }
      setActiveNav(current => current === next ? current : next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(syncActiveSection);
    };
    syncActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  useLayoutEffect(() => {
    const root = motionRootRef.current;
    if (!root) return undefined;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const hero = root.querySelector('.hero');
        const heroIntro = hero?.querySelector('.hero-intro');
        if (hero && window.scrollY < window.innerHeight * 0.6) {
          const opening = gsap.timeline({ defaults: { ease: 'power4.out' } });
          opening
            .fromTo(document.querySelectorAll('.site-nav .logo, .site-nav .nav-gooey, .site-nav .nav-contact'),
              { autoAlpha: 0, y: -24 },
              { autoAlpha: 1, y: 0, duration: 1.15, stagger: 0.1 }, 0)
            .fromTo(hero.querySelectorAll('.hero-meta span'),
              { autoAlpha: 0, y: 28, letterSpacing: '0.34em' },
              { autoAlpha: 1, y: 0, letterSpacing: '0.15em', duration: 1.05, stagger: 0.12 }, 0.18)
            .fromTo(hero.querySelectorAll('.hero-word span'),
              { autoAlpha: 0, yPercent: 125, scale: 0.88, rotateX: -22, transformOrigin: '50% 100%' },
              { autoAlpha: 1, yPercent: 0, scale: 1, rotateX: 0, duration: 1.55, stagger: 0.16, ease: 'power4.out' }, 0.28)
            .fromTo(hero.querySelector('.hero-subtitle'),
              { autoAlpha: 0, x: -42, clipPath: 'inset(0 100% 0 0)' },
              { autoAlpha: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 1.05 }, 0.82)
            .fromTo(hero.querySelector('.hero-personal-name'),
              { autoAlpha: 0, y: 28 },
              { autoAlpha: 1, y: 0, duration: 1.1 }, 0.96)
            .fromTo(heroIntro,
              { autoAlpha: 0, x: -48, y: 38, rotateY: -7, scale: 0.96 },
              { autoAlpha: 1, x: 0, y: 0, rotateY: 0, scale: 1, duration: 1.35, ease: 'power3.out' }, 1.18)
            .fromTo(hero.querySelector('.hero-aside'),
              { autoAlpha: 0, x: 44, y: 18 },
              { autoAlpha: 1, x: 0, y: 0, duration: 1.15 }, 1.35)
            .fromTo(hero.querySelectorAll('.hero-scroll, .hero-caption'),
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 }, 1.7);
        }

        const sections = [...root.querySelectorAll('main > section:not(.hero)')];
        sections.forEach((section) => {
          const isWork = section.id === 'work';
          const title = section.querySelector('.about-copy h2, .section-title h2, .capability-heading h2, .about-skills-heading h2, .contact-main h2');
          const label = section.querySelector('.section-label');
          const contentSelector = [
            '.about-layout > .about-copy', '.education-item', '.experience-entry-meta', '.experience-entry h3',
            '.experience-copy--grid > p', '.experience-list--overseas > .experience-entry',
            '.about-capability-card', '.metrics > div', '.toolkit-card', '.language-panel > div',
            '.contact-main .eyebrow', '.contact-main .red-button', '.contact-aside', '.footer > *'
          ].join(',');
          const items = [...section.querySelectorAll(contentSelector)];
          if (title || label || items.length) {
            const sequence = gsap.timeline({
              scrollTrigger: { trigger: section, start: 'top 76%', once: true },
              defaults: { ease: 'power3.out' }
            });
            if (label) sequence.fromTo(label, { autoAlpha: 0, y: 18, clipPath: 'inset(0 0 100% 0)' }, { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.8 }, 0);
            if (title) sequence.fromTo(title,
              { autoAlpha: 0, y: 96, scale: 0.9, transformOrigin: 'left 75%', clipPath: 'inset(0 0 22% 0)' },
              { autoAlpha: 1, y: 0, scale: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.28, ease: 'power4.out' }, 0.06);
            if (items.length) sequence.fromTo(items,
              { autoAlpha: 0, y: 36, rotateX: -3, transformPerspective: 900 },
              { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.92, stagger: { each: 0.11, from: 'start' }, clearProps: 'transform,opacity,visibility' },
              title ? 0.62 : 0.18);
          }

          const portrait = section.querySelector('.about-portrait');
          const portraitImage = portrait?.querySelector('img');
          if (portraitImage) {
            gsap.fromTo(portraitImage, { scale: 1.075 }, {
              scale: 1,
              duration: 1.65,
              ease: 'power3.out',
              immediateRender: false,
              scrollTrigger: { trigger: portrait, start: 'top 84%', once: true },
            });
          }

          if (isWork) {
            section.querySelectorAll('.project-card').forEach((card, index) => {
              const visual = card.querySelector('.project-visual-wrap');
              const content = card.querySelector('.project-content');
              if (visual && content) {
                gsap.fromTo(content,
                  { autoAlpha: 0, x: () => window.innerWidth > 850 ? (index % 2 === 0 ? 54 : -54) : 0, y: 18 },
                  { autoAlpha: 1, x: 0, y: 0, duration: 1.1, ease: 'power3.out', clearProps: 'transform,opacity,visibility',
                    scrollTrigger: { trigger: card, start: 'top 78%', once: true, invalidateOnRefresh: true } });
              }
            });
          }
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return <>
    <a className="skip-link" href="#about">跳到正文</a>
    <SiteHeader activeIndex={activeNav} onChange={setActiveNav} floating={isFloating} />
    <main id="top" ref={motionRootRef}>
      <section className="hero" aria-labelledby="hero-title">
        <MicroSlats className="hero-micro-slats" preset="swell" color="#aeb4b8" glintColor="#f0f0ec" backgroundColor="rgba(0,0,0,0)" slatWidth={7} slatHeight={18} gap={3} speed={0.38} glint={0.65} interactive cursorStrength={0.7} cursorSize={32} swirl={0.35} trail={1.1} lean={0.12}/>
        <div className="hero-meta"><span>INDEPENDENT PRODUCT THINKER</span><span>SHENZHEN · CHINA · 2026</span></div>
        <div className="hero-heading"><h1 className="hero-word" id="hero-title"><span>LI HAORAN’S</span><span>PERSONAL CENTER</span></h1><p className="hero-subtitle"><span>DESIGN IS</span> <strong>HOW IT WORKS.</strong></p><div className="hero-personal-name"><span>李浩然</span><small>LEON LEE</small></div></div>
        <div className="hero-bottom"><SpecularSurface className="hero-intro" radius={14} tint="#cbd0d2" tintOpacity={0.07} blur={22} textColor="#f4f2ec" lineColor="#d8dcde" baseColor="#aeb4b8" intensity={1.15} idleIntensity={0.18} shineSize={8} shineFade={28} thickness={1.15} glow={0.9} speed={0.3} followMouse proximity={300}><p className="hero-cn">让复杂的事<br/><em>变得清晰而有用</em></p><p>李浩然 Leon · AI / 产品经理 / UX<br/>连接用户需求、产品策略与技术落地。</p><a className="red-button" href="#work">项目查看 <ArrowUpRight size={16}/></a></SpecularSurface><p className="hero-aside">DESIGN IS<br/><em>HOW IT WORKS.</em></p></div>
        <div className="hero-footer">
          <a className="hero-scroll" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={14}/></a>
          <span className="hero-caption">USER EXPERIENCE / AI APPLICATION / PRODUCT STRATEGY</span>
        </div>
      </section>
      <section className="about section-shell about-page about-page-intro" id="about">
        <div className="section-label"><span>ABOUT / 关于</span><span>产品思维 / 设计背景 / 国际视野</span></div>
        <div className="about-layout">
          <div className="about-portrait"><img src={publicAsset('leon-profile.png')} alt="李浩然个人照片" loading="lazy"/><span className="portrait-index">LEON · SHENZHEN</span></div>
          <div className="about-copy"><h2>以设计为起点，<br/>以产品为方法，<br/><em>让 AI 真正解决问题。</em></h2><p>产品与服务设计硕士，现任职产品经理，自主完成企业协同平台产品、企业知识库产品的可操作 Demo 到验收用例的设计，具备需求分析、产品规划、国际化产品、产品资料治理及跨职能协作经验。</p><div className="contact-details"><a href="tel:+8618320761224"><Phone size={15}/> +86 183 2076 1224</a><a href="mailto:18152006434@163.com"><Mail size={15}/> 18152006434@163.com</a><span><MapPin size={15}/> 深圳，中国</span></div></div>
        </div>
        <div className="education-history">
          <p className="eyebrow">EDUCATION / <span className="education-label-cn">教育经历</span></p>
          <div className="education-grid">
            <article className="education-item"><span className="education-index">01 / MASTER</span><span className="education-year">2020 — 2023</span><h3>意大利米兰 NABA 美术学院</h3><p className="education-school">Nuova Accademia delle Belle Arti</p><p className="education-degree"><span>产品与服务设计</span><i>｜</i><b>硕士</b></p></article>
            <article className="education-item"><span className="education-index">02 / BACHELOR</span><span className="education-year">2016 — 2020</span><h3>天津传媒学院</h3><p className="education-degree"><span>动画专业（游戏设计方向）</span><i>｜</i><b>学士</b></p></article>
          </div>
        </div>
      </section>
      <section className="capability-page section-shell experience-page experience-page--domestic" id="strengths">
        <div className="section-label"><span>CAPABILITIES / 能力</span><span>01 / 国内工作经历</span></div>
        <div className="capability-heading"><h2>国内工作经历</h2><p>从产品规划，到设计实践。</p></div>
        <div className="experience-list experience-list--domestic">
          <article className="experience-entry experience-entry--featured"><div className="experience-entry-meta"><span>2024.03 — 至今</span><span className="experience-role">产品经理</span></div><h3>深圳市大唐计算机有限公司</h3><div className="experience-copy experience-copy--grid"><p><b>企业知识库 AI 助手</b>围绕内部产品信息查询、参数问答与基础产品对比 3 类任务，主导 Coze AI Agent 内部原型，负责需求梳理、Prompt 设计、知识库结构规划、产品资料结构化及 RAG 检索问答路径，支持内部测试与内容迭代。</p><p><b>企业智选协同平台</b>基于在企业的行业需求和工作场景，自主设计并搭建“智选协同平台”进行验证，覆盖需求录入、规则选型、产品知识库、AI 知识问答、人工确认、方案流转与反馈闭环；输出 PRD，形成从业务分析到平台原型与验收设计的完整实践。</p><p><b>本职工作与 AI 结合</b>负责工业计算机、Mini PC 及国产化工业主板的产品规划与市场支持，参与产品定位、需求分析与方案制定；将复杂技术参数转化为可查询、可比较、可维护的产品知识与资料规范，为平台选型规则和企业知识库提供业务内容基础。</p><p><b>跨职能落地</b>主导 OITECH 子公司产品信息与品牌规范，协调设计与供应链团队推进标识、包装及信息标准落地；结合使用需求和市场反馈参与产品体验优化。</p></div></article>
          <article className="experience-entry"><div className="experience-entry-meta"><span>2023.05 — 2024.01</span><span className="experience-role">产品设计师</span></div><h3>深圳市一毫米工业设计有限公司</h3><div className="experience-copy experience-copy--grid"><p>负责消费电子及智能硬件产品设计，参与产品从需求分析、竞品研究、概念设计到量产导入的全流程开发。</p><p>基于用户需求、市场趋势及竞品分析，参与产品定位及设计方案制定，平衡用户体验、制造成本与商业可行性。</p><p>基于早期生成类大模型特性，初建 AI 出图与辅助 ID 设计工作流，由草图到 AI 模拟，再由方案建模到 AI 修正，最终匹配产品硬件与结构实现快速落地与可行性分析。</p></div></article>
        </div>
      </section>
      <section className="capability-page section-shell experience-page experience-page--overseas" id="overseas-experience">
        <div className="section-label"><span>CAPABILITIES / 能力</span><span>02 / 海外工作经历</span></div>
        <div className="capability-heading"><h2>海外工作经历</h2><p>在欧洲项目中积累产品设计与本地化实践。</p></div>
        <div className="experience-list experience-list--overseas">
          <article className="experience-entry"><div className="experience-entry-meta"><span>2022.08 — 2023.02</span><span className="experience-role">产品设计师实习</span></div><h3>JAC 江淮汽车意大利设计中心</h3><div className="experience-copy"><p>参与海外产品设计与本地化优化工作，结合欧洲市场用户习惯优化产品视觉与交互表达方式。</p><p>参与阿尔法·罗密欧、法拉利等品牌相关设计项目，协同设计团队推进方案验证与落地。</p><p>参与产品概念设计与方案验证，支持多语言场景下的产品表达与内容适配。</p></div></article>
          <article className="experience-entry"><div className="experience-entry-meta"><span>2020.09 — 2021.02</span><span className="experience-role">产品设计师实习</span></div><h3>MM S.p.A. 米兰市政基础设施公司</h3><div className="experience-copy"><p>参与产品外观与结构设计优化，支持产品从概念到样机阶段的设计验证。</p><p>协助公司完成欧盟限塑法令相关的可持续设计项目，包括流程建模与场景验证。</p><p>通过用户研究与利益相关者访谈，识别服务流程中的痛点与优化机会。</p></div></article>
        </div>
      </section>
      <section className="about-continuation section-shell about-page about-page-skills capability-page moved-capabilities" id="core-capabilities">
        <div className="section-label"><span>CAPABILITIES / 能力</span><span>从需求分析到产品落地</span></div>
        <div className="about-skills-heading"><p className="eyebrow">CORE CAPABILITIES</p><h2>核心能力</h2></div>
        <div className="about-capability-grid">
          <article className="about-capability-card"><span>01 / PRODUCT DELIVERY</span><h3>企业需求与产品交付</h3><p>用户任务与业务流程梳理、需求分析、功能优先级、PRD、角色权限、状态流转、异常边界及验收用例设计。</p></article>
          <article className="about-capability-card"><span>02 / AI APPLICATION</span><h3>AI 应用设计</h3><p>具备 Codex、Prompt、RAG 与知识库结构实践，理解来源引用、人工复核、拒答、badcase 与 AI 发布风险。</p></article>
          <article className="about-capability-card"><span>03 / SALES & DATA</span><h3>销售协同与数据设计</h3><p>围绕客户需求、产品知识、规则选型、方案流转与反馈待办设计业务闭环，能够梳理数据字典、指标口径、埋点需求及 CRM 协同规划。</p></article>
          <article className="about-capability-card"><span>04 / PROTOTYPE & TEAMWORK</span><h3>原型与跨职能协作</h3><p>熟悉 Figma、Miro，能够借助 AI 编程工具快速验证产品方案；具备产品、设计、研发、供应链及市场团队协作经验。</p></article>
        </div>
        <div className="metrics"><div><strong>3<span>+</span></strong><small>年产品与设计经验</small></div><div><strong>02</strong><small>企业 AI 产品原型</small></div><div><strong>11</strong><small>协同平台功能模块</small></div><div><strong>IT <i>↔</i> CN</strong><small>跨文化协作视角</small></div></div>
      </section>
      <section className="capability-page section-shell toolkit-page" id="toolkit">
        <div className="section-label"><span>CAPABILITIES / 能力</span><span>03 / TOOLS & LANGUAGES</span></div>
        <div className="capability-heading"><p className="eyebrow">03 / TOOLS & LANGUAGES</p><h2>工具与语言</h2><p>围绕产品设计、AI 原型验证与跨团队交付建立的工作工具箱。</p></div>
        <div className="toolkit-grid">
          <article className="toolkit-card"><span>01 / AI & PRODUCT</span><h3>AI 与产品工具</h3><div className="tool-chips"><span>Codex</span><span>Coze</span><span>Prompt</span><span>RAG</span><span>AI Agent</span><span>Cursor</span><span>Vibe Coding</span></div></article>
          <article className="toolkit-card"><span>02 / PRODUCT METHODS</span><h3>产品方法</h3><div className="tool-chips"><span>需求分析</span><span>业务流程</span><span>信息架构</span><span>PRD</span><span>数据字典</span><span>指标口径</span><span>验收用例</span><span>需求追踪矩阵</span></div></article>
          <article className="toolkit-card"><span>03 / DESIGN & MAKING</span><h3>设计与制作</h3><div className="tool-chips"><span>Figma</span><span>Miro</span><span>Rhino</span><span>KeyShot</span><span>Illustrator</span><span>Photoshop</span><span>Premiere</span><span>After Effects</span></div></article>
        </div>
        <div className="language-panel"><span className="language-label">LANGUAGES / 语言</span><div><span>英语</span><strong>可作为工作语言</strong></div><div><span>意大利语</span><strong>基础</strong></div></div>
      </section>
      <section className="work section-shell" id="work"><div className="section-label"><span>WORK / 项目</span><span>从问题定义，到体验落地</span></div><div className="section-title"><div><h2>把想法，<em>变成可用的东西。</em></h2></div><span className="title-aside">AI PRODUCT DESIGN<br/>2023 — 2026</span></div>
        <div className="project-list">{projects.map((p, i) => {
          if (p.steps) {
            const imageUrl = publicAsset(p.image);
            return (
              <article className="project-card project-workflow" key={p.id}>
                <div className="project-visual-wrap">
                  <a className="project-visual" href={imageUrl} target="_blank" rel="noopener"
                    aria-label="在新标签页查看产品外观开发工作流原图">
                    <img src={imageUrl} alt="产品外观开发工作流示意图" width="1672" height="941" loading="lazy" />
                    <div className="project-visual-shade" aria-hidden="true" />
                    <span className="project-kind" lang="en">WORKFLOW</span>
                  </a>
                </div>
                <div className="project-content">
                  <header className="project-heading">
                    <h3>{p.title}</h3>
                    <p>{p.summary}</p>
                  </header>
                  <ol className="workflow-steps" role="list">
                    {p.steps.map((step, index) => (
                      <li key={step.english}>
                        <span className="workflow-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                        <h4>{step.title}<span lang="en">{step.english}</span></h4>
                        <p>{step.detail}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            );
          }
          const ProjectVisual = p.href ? 'a' : 'div';
          return <article className={`project-card ${i === 0 ? 'project-featured' : ''} ${p.id === '02' ? 'project-knowledge' : ''}`} key={p.id}><div className="project-visual-wrap"><ProjectVisual className="project-visual" href={p.href} target={p.href ? '_blank' : undefined} rel={p.href ? 'noopener noreferrer' : undefined} aria-label={p.href ? `打开${p.title}在线项目` : undefined}><img src={publicAsset(p.image)} alt="" loading="lazy"/><div className="project-visual-shade"/><span className="project-kind">{p.type}</span>{p.id === '02' && <span className="project-kind project-kind--right">AI PRODUCT · INTERNAL TOOL</span>}</ProjectVisual>{p.href && <Suspense fallback={<a className="project-open project-open--loading" href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`打开${p.title}在线项目`}><ArrowUpRight/></a>}><SlingButton className="project-open-sling" ariaLabel={`打开${p.title}在线项目`} padColor="#aeb4b8" iconColor="#17191a" accentColor="#f0f0ec" wellColor="#242522" bandColor="#8b9296" size={34} strokeWidth={1.25} armAt={31} maxPull={90} onSend={() => window.open(p.href, '_blank', 'noopener,noreferrer')}><ArrowUpRight size={14} strokeWidth={1.8}/></SlingButton></Suspense>}</div><div className="project-content"><div className="project-heading"><h3>{p.title}</h3><p>{p.summary}</p></div><div className="project-detail"><p>{p.detail}</p><div className="tag-list">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>{p.id === '01' && <div className="project-impact project-impact--platform"><div className="impact-kicker">IMPACT <span>/ 项目成效</span></div><div className="impact-team"><strong>12</strong><span>位销售与商务成员日常选型</span></div><div className="impact-coverage"><strong>3 条销售线</strong><span>覆盖约 20 人团队规模</span></div><div className="impact-time"><span>单次方案输出</span><div><del>2 小时</del><b>→</b><strong>20–30 分钟</strong></div></div></div>}{p.id === '02' && <div className="project-impact project-impact--knowledge"><div className="impact-kicker">IMPACT <span>/ 项目成效</span></div><div className="knowledge-reach"><div><strong>28</strong><span>位对外岗位成员与外部新客</span></div><p><b>销售 16</b><i>商务 5</i><i>产品 4</i><i>市场 3</i></p></div><div className="knowledge-coverage"><strong>双品牌 <b>×</b> 7 品类</strong><span>统一 Maxtang 与 OITECH 参数口径</span></div><div className="knowledge-proof"><div><strong>93%</strong><span>30 条产品对比问答人工复核，28 条结论正确，2 条为参数版本混淆</span></div><div><strong>98%</strong><span>AI助手回答完整率</span></div></div><div className="knowledge-onboarding"><span>新员工独立参数查阅时间</span><div><del>4 天</del><b>→</b><strong>2 天</strong></div></div></div>}</div></article>;
        })}</div>
      </section>
      <section className="contact-section" id="contact"><div className="contact-inner"><div className="section-label"><span>04 — WHAT'S NEXT</span></div><div className="contact-main"><p className="eyebrow">下一个好产品，从一次对话开始。</p><h2>有个产品问题，<br/><em>值得一起解决？</em></h2><a className="red-button" href="mailto:18152006434@163.com">给我写邮件 <ArrowUpRight size={17}/></a><p className="contact-aside">AI PRODUCT<br/>PRODUCT STRATEGY<br/>EXPERIENCE DESIGN</p></div><footer className="footer"><a className="logo" href="#top"><img src={publicAsset('leon-metal-logo.png')} alt=""/><small>HAORAN LI<br/>PRODUCT · AI · DESIGN</small></a><p>构建舒适的体验，设计有用的产品</p><a href="mailto:18152006434@163.com">18152006434@163.com <ArrowUpRight size={14}/></a><small>© 2026 LEON HAORAN LI</small></footer></div></section>
    </main>
  </>;
}
createRoot(document.getElementById('root')).render(<App/>);
















