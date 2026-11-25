import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import GooeyNav from './GooeyNav.jsx';

export const publicAsset = (filename) => import.meta.env.BASE_URL + filename;
const resumeFilename = 'lihaoran_AI-PM_v3.pdf';
const resumeDownloadName = '李浩然_AI产品经理_v3.pdf';

const navigation = [
  { label: 'ABOUT / 关于', href: '#about' },
  { label: 'CAPABILITIES / 能力', href: '#strengths' },
  { label: 'WORK / 项目', href: '#work' },
  { label: 'DESIGN / 设计', href: 'design/' },
  { label: 'CONTACT / 联系', href: '#contact' },
];

export const DESIGN_NAV_INDEX = navigation.findIndex(({ href }) => href === 'design/');
export const CONTACT_NAV_INDEX = navigation.findIndex(({ href }) => href === '#contact');

export default function SiteHeader({ activeIndex, onChange, floating = false, designPage = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const items = navigation.map((item) => ({
    ...item,
    href: item.href.startsWith('#') && !designPage ? item.href : publicAsset(item.href),
  }));

  return (
    <header className={`site-nav${floating ? ' is-floating' : ''}`}>
      <a className="logo" href={designPage ? publicAsset('') : '#top'} aria-label="Leon，回到首页">
        <img src={publicAsset('leon-metal-logo.png')} alt="" />
        <small>HAORAN LI<br />PRODUCT · AI · DESIGN</small>
      </a>
      <div className="nav-gooey">
        <GooeyNav items={items} initialActiveIndex={activeIndex} activeIndex={activeIndex}
          onChange={onChange} theme="dark" color="#aeb4b8" activeTextColor="#17191a"
          size="sm" frame className="site-gooey-nav" onItemClick={closeMenu}
          style={{ '--gn-frame': 'rgba(24,25,26,.72)', '--gn-frame-edge': 'rgba(255,255,255,.13)', '--gn-frame-highlight': 'rgba(255,255,255,.09)', '--gn-muted': 'rgba(242,242,238,.72)' }} />
      </div>
      <nav id="site-mobile-nav" className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="主导航">
        {items.map((item, index) => (
          <a key={item.label} href={item.href} onClick={closeMenu}
            aria-current={designPage && index === DESIGN_NAV_INDEX ? 'page' : undefined}>
            {item.label}
          </a>
        ))}
        <a className="mobile-resume-download" href={publicAsset(resumeFilename)}
          download={resumeDownloadName} onClick={closeMenu}>
          简历下载 <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </nav>
      <a className="nav-contact resume-download" href={publicAsset(resumeFilename)}
        download={resumeDownloadName}>简历下载 <ArrowUpRight size={15} /></a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? '关闭导航' : '打开导航'}
        aria-expanded={menuOpen} aria-controls="site-mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}
