interface Profile {
  full_name?: string;
  title?: string;
  tagline?: string;
  bio?: string[];
  social?: { name: string; url: string }[];
}

interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string[];
}

type Education = { school: string; degree: string; dates: string };

async function fetchJSON<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error('Failed to load');
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function loadProfile() {
  const data = await fetchJSON<Profile>('datasets/profile.json');
  if (!data) return;
  document.getElementById('full-name')!.textContent = data.full_name ?? '';
  document.getElementById('title')!.textContent = data.title ?? '';
  document.getElementById('tagline')!.textContent = data.tagline ?? '';

  const labels = ['ABOUT', 'EXPERIENCE', 'SKILLS'];
  const labelsList = document.getElementById('labels')!;
  labels.forEach(l => {
    const li = document.createElement('li');
    li.textContent = l;
    labelsList.appendChild(li);
  });

  const socialList = document.getElementById('social')!;
  data.social?.forEach(s => {
    const a = document.createElement('a');
    a.href = s.url;
    a.textContent = s.name;
    a.className = 'text-teal-400 hover:underline';
    socialList.appendChild(a);
  });

  const bioContainer = document.getElementById('bio')!;
  data.bio?.forEach(p => {
    const paragraph = document.createElement('p');
    paragraph.className = 'mb-4';
    paragraph.textContent = p;
    bioContainer.appendChild(paragraph.cloneNode(true));
  });

  const aboutContainer = document.getElementById('about-text')!;
  data.bio?.forEach(p => {
    const paragraph = document.createElement('p');
    paragraph.className = 'mb-4';
    paragraph.textContent = p;
    aboutContainer.appendChild(paragraph);
  });
}

async function loadExperience() {
  const data = await fetchJSON<Experience[]>('datasets/experiences.json');
  if (!data) return;
  const container = document.getElementById('experience')!;
  data.forEach(exp => {
    const div = document.createElement('div');
    div.className = 'mb-6';
    const header = document.createElement('h3');
    header.className = 'text-lg text-teal-400';
    header.textContent = `${exp.title} @ ${exp.company}`;
    const duration = document.createElement('p');
    duration.className = 'text-sm text-gray-400';
    duration.textContent = exp.duration;
    const ul = document.createElement('ul');
    ul.className = 'list-disc ml-5 mt-2';
    exp.description.forEach(d => {
      const li = document.createElement('li');
      li.textContent = d;
      ul.appendChild(li);
    });
    div.appendChild(header);
    div.appendChild(duration);
    div.appendChild(ul);
    container.appendChild(div);
  });
}

async function loadSkills() {
  const data = await fetchJSON<string[]>('datasets/skills.json');
  if (!data) return;
  const container = document.getElementById('skills')!;
  const ul = document.createElement('ul');
  ul.className = 'grid grid-cols-2 gap-2';
  data.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    ul.appendChild(li);
  });
  container.appendChild(ul);
}

async function init() {
  await loadProfile();
  await loadExperience();
  await loadSkills();
}

document.addEventListener('DOMContentLoaded', init);
