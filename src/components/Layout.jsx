import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

import '../assets/css/Layout.css'

const menus = [
  { path: '/', icon:'🏠', label: '홈' },
  { path: '/clock', icon:'⏰', label: '시계' },
  { path: '/memo', icon:'📝', label: '메모·할일' },
  { path: '/fortune', icon:'🔮', label: '운세' },
  { path: '/calendar', icon:'📅', label: '캘린더' },
  { path: '/news', icon:'📰', label: '뉴스' },
  { path: '/weather', icon:'🌤', label: '날씨' },
  { path: '/game', icon:'🎮', label: '미니게임' },
]

function Layout() {
  return (
    <div className="layout__wrap">
      <div className="layout__screen">
        <Outlet />
      </div>
      <nav className="layout__nav">
        {menus.map((menu) => (
          <Link
            to={menu.path}
            key={menu.path}
            className="layout__nav-btn"
          >
            <span className="layout__nav-icon">{menu.icon}</span>
            <span className="layout__nav-label">{menu.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Layout;