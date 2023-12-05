$(function () {
  // 대상을 변수에 저장
  const $btnMenu = $('.btn-menu');
  const $menu = $('.menu-wrap');
  const $dim = $('.dim');

  // flag : 아직 활성화 되지 않음
  let isActive = false;

  // 햄버거 버튼을 클릭했을 때
  $btnMenu.on('click', function (e) {
    e.preventDefault();

    // $menu가 보여지게 : isActive 조건에 따라서
    // isActive === false ? openMenu() : closeMenu()
    !isActive ? openMenu() : closeMenu();

    // dim을 클릭했을 때
    $dim.on('click', closeMenu);
  });

  // 공통의 동작을 함수로 정의
  // 1. 메뉴의 움직임 (보이거나 숨기거나)
  function slideMenu(pos) {
    $menu.stop().animate(
      {
        left: pos,
      },
      350
    );
  }
  // 2. openMenu : 메뉴를 보이게(메뉴, active 부여, dim fadeIn, isActuve)
  function openMenu() {
    $btnMenu.addClass('active');
    $dim.stop().fadeIn();
    slideMenu(0);
    isActive = true;
  }
  // 3. closeMenu : 메뉴를 안 보이게(메뉴, active 삭제, dim fadeOut, isActive)
  function closeMenu() {
    $btnMenu.removeClass('active');
    $dim.stop().fadeOut();
    slideMenu('-100%');
    isActive = false;

    // 서브메뉴 초기화
    initSubmenu();
  }
  const $menuList = $('.menu > li');
  const $submenu = $('.submenu');
  $menuList.on('click', function (e) {
    e.preventDefault();
    initSubmenu();

    $(this).toggleClass('on');
    $(this).find($submenu).stop().slideToggle();
  });

  // 서브메뉴 초기화 함수로 분리
  function initSubmenu() {
    // 서브메뉴 동작
    $submenu.stop().slideUp();
    $menuList.removeClass('on');
  }
});
