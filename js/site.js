'use strict';
const toggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
const mobileMenu = window.matchMedia('(max-width: 760px)');
function setMenu(open) {
  if (!toggle || !navigation) return;
  navigation.classList.toggle('is-open', open);
  navigation.inert = mobileMenu.matches && !open;
  toggle.setAttribute('aria-expanded', String(open));
  const icon = toggle.querySelector('span');
  if (icon) icon.textContent = open ? '×' : '☰';
}
function closeMenu() { setMenu(false); }
toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
navigation?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener('click', e => { if (!e.target.closest('.header')) closeMenu(); });
mobileMenu.addEventListener('change', closeMenu);
closeMenu();
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const filters=[...document.querySelectorAll('[data-filter]')];
function filterServices(category){filters.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===category)));document.querySelectorAll('[data-category]').forEach(row=>row.hidden=category!=='Todos'&&row.dataset.category!==category);}
filters.forEach(button=>button.addEventListener('click',()=>filterServices(button.dataset.filter)));
window.addEventListener('hashchange',()=>{if(location.hash&&filters.length)filterServices('Todos');});
const dialog=document.getElementById('photo-dialog');
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{const img=dialog.querySelector('img');img.src=button.dataset.photo;img.alt=button.querySelector('img').alt;dialog.querySelector('p').textContent='';dialog.showModal();document.body.classList.add('modal-open');}));
dialog?.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',e=>{const bounds=dialog.getBoundingClientRect();if(e.clientX<bounds.left||e.clientX>bounds.right||e.clientY<bounds.top||e.clientY>bounds.bottom)dialog.close();});
dialog?.addEventListener('close',()=>document.body.classList.remove('modal-open'));
document.getElementById('contact-form')?.addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const data=new FormData(form);const message=`Olá! Meu nome é ${String(data.get('name')).trim()}.\nServiço de interesse: ${data.get('service')}.\n\n${String(data.get('message')).trim()}`;window.location.assign('https://wa.me/5511989450065?text='+encodeURIComponent(message));});
