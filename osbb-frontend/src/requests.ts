export async function loadRequests(section: string = '') {
  const list = document.getElementById('requests-list')!;
  const token = localStorage.getItem('token') || '';

  list.innerHTML = '';
  const res = await fetch(`http://localhost:3000/api/messages?section=${section}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const requests = await res.json();

  requests.forEach((r: any) => {
    const li = document.createElement('li');
    li.textContent = r.text;
    list.appendChild(li);
  });
}
