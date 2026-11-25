import { createRoot } from 'react-dom/client';
import { ArrowUpRight } from 'lucide-react';
import './style.css';
import './design.css';
import SiteHeader, { DESIGN_NAV_INDEX, publicAsset } from './SiteHeader.jsx';

const designProjects = [
  {
    number: '01',
    slug: 'c-pipe',
    title: 'MM S.p.A. · C-Pipe 水壶',
    category: '产品设计',
    purpose: 'C-Pipe 旨在减少一次性塑料水瓶带来的污染，并在设计中考虑欧盟限塑要求。',
    solution: '将管状瓶身弯成字母 C，形成可移动的开口，便于手持，也可以挂在背包或其他设备上。',
    english: 'C-Pipe is designed to reduce waste from single-use plastic water bottles. A movable opening in the C-shaped body makes it easy to carry or attach to a bag or other equipment.',
    cover: { file: 'cover.jpg', alt: 'C-Pipe 水壶主视觉：透明的 C 形瓶身、材料与配色方案' },
    gallery: [
      { file: 'board-01.jpg', alt: 'C-Pipe 水壶的手绘草图和四种配色' },
      { file: 'board-02.jpg', alt: 'C-Pipe 水壶的手持、挂包和饮用场景' },
    ],
  },
  {
    number: '02',
    slug: 'nubomed',
    title: '诺博医疗 · 麻醉药品贴标机',
    category: '工业设计',
    purpose: '为诺博医疗设计面向医用麻醉药品的贴标机，填补药品贴标设备的市场空白。',
    solution: '我负责机器主体外观和外置监控摄像头支架的设计，将硬件结构与医护人员的操作流程结合起来。',
    english: 'Designed for NuboMed, this machine addresses a gap in labeling equipment for anesthetic drugs. My work covered the machine enclosure and the external camera mount, taking hardware constraints and operator workflows into account.',
    cover: { file: 'cover.jpg', alt: '诺博医疗麻醉药品贴标机主视觉' },
    gallery: [
      { file: 'board-01.jpg', alt: '贴标机主体与摄像头支架的手绘草图和造型效果' },
      { file: 'board-02.jpg', alt: '贴标机的多角度外观、操作面板和医护人员使用场景' },
    ],
  },
  {
    number: '03',
    slug: 'eyespro',
    title: '孩视宝 · “路灯”护眼灯',
    category: '工业设计',
    purpose: '迭代面向儿童和青少年的“路灯”系列，为阅读和学习提供适合长时间使用的照明。',
    solution: '以双光源台灯作为系列的差异化方向。我重新设计了产品的安装方式，以降低包装和生产成本。',
    english: 'The Street Light series is an updated task lighting range for children and teenagers. The project explored dual light sources for reading and studying. I redesigned how the lamp is assembled to reduce packaging and production costs.',
    cover: { file: 'cover.jpg', alt: '孩视宝“路灯”系列主视觉，展示四种灯具造型' },
    gallery: [
      { file: 'board-01.jpg', alt: '双光源台灯的手绘草图及正面和侧面效果' },
      { file: 'board-02.jpg', alt: '灯具在书桌和会议桌上的使用场景，以及灯臂与底座细节' },
    ],
  },
  {
    number: '04',
    slug: 'rotaliana-oo',
    title: 'Rotaliana · O&O 壁挂灯',
    category: '工业设计',
    purpose: '为意大利灯具品牌 Rotaliana 探索现代卧室的辅助照明，让壁挂灯能搭配不同风格和色调的空间。',
    solution: '采用双端可折叠支架和可旋转的圆形主柱，方便调整灯头角度。底座材质可根据室内风格定制。',
    english: 'O&O is a wall lamp designed for Rotaliana as a secondary light source for modern bedrooms. Its folding support and rotating column let users adjust the light angle, while the base material can be customized to suit the room.',
    cover: { file: 'cover.jpg', alt: 'Rotaliana O&O 壁挂灯主视觉，展示环形灯头、折叠支架和大理石纹底座' },
    gallery: [
      { file: 'board-01.jpg', alt: 'O&O 的设计草图、结构拆解、折叠角度和底座材质方案' },
      { file: 'board-02.jpg', alt: 'O&O 壁挂灯在三种室内环境中的安装和照明效果' },
    ],
  },
  {
    number: '05',
    slug: 'clipy',
    title: 'Clipy',
    category: '产品设计',
    recognition: '2022 年 NABA 设计奖提名',
    purpose: '从回形针沿几个节点弯折就能改变形状的特点出发，设计一款能适应不同照明场景的灯。',
    solution: '灯体可沿关节调整形态，旋转开关提供两档亮度。系列包含台灯和落地灯等形态，适用于卧室、客厅等空间。',
    english: 'Inspired by the way a paper clip bends, Clipy changes shape at its joints to suit different settings. A rotary switch selects between two brightness levels. The series includes table and floor lamps for spaces such as bedrooms and living rooms.',
    cover: { file: 'cover.jpg', alt: 'Clipy 灯具系列主视觉与 2022 年 NABA 设计奖提名标识' },
    gallery: [
      { file: 'board-01.jpg', alt: 'Clipy 的回形针灵感、灯体关节结构和设计草图' },
      { file: 'board-02.jpg', alt: 'Clipy 灯具的旋转开关、台灯和落地灯，以及卧室与客厅使用场景' },
    ],
  },
  {
    number: '06',
    slug: 'go-post',
    title: 'GO POST',
    category: 'UX 产品设计',
    purpose: '疫情后，都市青年与公共空间的互动减少。GO POST 希望用增强现实（AR）鼓励他们走出家门，重新探索熟悉的城市。',
    solution: '用户可以在地图上发现附近的内容，用 AR 相机在实地发布感受，并通过个性化虚拟形象、评论或聊天室与他人交流。',
    english: 'GO POST is an AR app concept for young city dwellers. It helps them rediscover public spaces by exploring nearby posts, sharing moments on location, and connecting through avatars, comments, and chat rooms.',
    cover: { file: '01.jpg', alt: 'GO POST 首图：应用标志、Go Another World 标语和手机主屏示意' },
    chapters: [
      {
        title: '设计背景与交互流程',
        images: [
          { file: '02.jpg', label: '02 / 问题与概念', alt: '项目背景、设计问题和 GO POST 的产品概念' },
          { file: '03.jpg', label: '03 / 交互流程', alt: '从探索和发布到互动的用户流程图' },
        ],
      },
      {
        title: '核心功能与界面',
        images: [
          { file: '04.jpg', label: '04 / 推荐与筛选', alt: '地图推荐、内容标签和筛选方式', wide: true },
          { file: '05.jpg', label: '05 / 探索', alt: '地图探索和附近内容的界面' },
          { file: '06.jpg', label: '06 / 发布', alt: '用相机发布内容和选择虚拟形象的界面' },
          { file: '07.jpg', label: '07 / 互动', alt: 'AR 内容的评论、点赞等互动方式' },
          { file: '08.jpg', label: '08 / 聊天室', alt: '将帖子升级为聊天室并展开交流的界面' },
        ],
      },
    ],
  },
];

const reservedSlots = Array.from({ length: 6 }, (_, index) => String(index + 1).padStart(2, '0'))
  .filter(number => !designProjects.some(project => project.number === number));

const designImageWidths = [720, 1200, 1920];
const designImageSizes = {
  cover: '(max-width: 850px) calc(100vw - 44px), min(48vw, 810px)',
  wide: '(max-width: 850px) calc(100vw - 44px), min(88vw, 1480px)',
  gallery: '(max-width: 560px) calc(100vw - 44px), (max-width: 850px) calc(50vw - 29px), min(44vw - 7px, 733px)',
};

function DesignImage({ project, image, cover = false, eager = false }) {
  const path = `design/${project.slug}/${image.file}`;
  const url = publicAsset(path);
  const stem = path.replace(/\.jpg$/, '');
  const webpSources = designImageWidths.map(width => `${publicAsset(`${stem}-${width}.webp`)} ${width}w`).join(', ');
  const sizes = designImageSizes[cover ? 'cover' : image.wide ? 'wide' : 'gallery'];
  return (
    <a className="design-image" href={url} target="_blank" rel="noopener"
      aria-label={`在新标签页查看：${image.alt}`}>
      <picture>
        <source type="image/webp" srcSet={webpSources} sizes={eager ? sizes : `auto, ${sizes}`} />
        <img src={url} alt={image.alt} width="1920" height="1080"
          loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} decoding="async" />
      </picture>
      {image.label && <span className="design-image-label" aria-hidden="true">{image.label}</span>}
      <span className="design-image-open" aria-hidden="true"><ArrowUpRight size={15} /></span>
    </a>
  );
}

function DesignProject({ project, eager }) {
  return (
    <article className="design-project" aria-labelledby={project.slug}>
      <div className="project-card design-project-main">
        <DesignImage project={project} image={project.cover} cover eager={eager} />
        <div className="project-content design-project-copy">
          <header className="project-heading">
            <p className="design-project-label">{project.number} / {project.category}</p>
            <h2 id={project.slug}>{project.title}</h2>
            {project.recognition && <p className="design-project-recognition">{project.recognition}</p>}
          </header>
          <dl className="design-project-notes">
            <div><dt>设计目标</dt><dd>{project.purpose}</dd></div>
            <div><dt>设计方案</dt><dd>{project.solution}</dd></div>
          </dl>
          <p className="design-english" lang="en">{project.english}</p>
        </div>
      </div>
      {project.gallery && (
        <div className="design-gallery" aria-label={`${project.title}设计展板`}>
          {project.gallery.map(image => <DesignImage key={image.file} project={project} image={image} />)}
        </div>
      )}
      {project.chapters?.map(chapter => (
        <section className="design-chapter" key={chapter.title}>
          <h3>{chapter.title}</h3>
          <ul className="design-gallery" role="list">
            {chapter.images.map(image => (
              <li className={image.wide ? 'design-gallery-wide' : undefined} key={image.file}>
                <DesignImage project={project} image={image} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}

function DesignPage() {
  return (
    <>
      <a className="skip-link" href="#design-content">跳到正文</a>
      <SiteHeader activeIndex={DESIGN_NAV_INDEX} floating designPage />
      <main id="design-content" className="section-shell design-shell">
        <header className="design-page-heading">
          <div className="section-label"><span>DESIGN / 设计</span><span>HAORAN LI</span></div>
          <h1>设计作品</h1>
        </header>
        {designProjects.map((project, index) => <DesignProject key={project.slug} project={project} eager={index === 0} />)}
        {reservedSlots.length > 0 && (
          <section className="design-reserved" aria-labelledby="design-reserved-title">
            <h2 id="design-reserved-title">待补充的设计项目</h2>
            <ol start={Number(reservedSlots[0])} role="list">
              {reservedSlots.map(number => <li key={number}>项目 {number}</li>)}
            </ol>
          </section>
        )}
        <footer className="design-footer">
          <a href={publicAsset('#work')}>返回 WORK / 项目 <ArrowUpRight size={14} /></a>
          <small>© 2026 LEON HAORAN LI</small>
        </footer>
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<DesignPage />);
