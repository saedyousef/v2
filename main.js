var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchJSON(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(path);
            if (!response.ok)
                throw new Error('Failed to load');
            return yield response.json();
        }
        catch (err) {
            console.error(err);
            return null;
        }
    });
}
function loadProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        const data = yield fetchJSON('datasets/profile.json');
        if (!data)
            return;
        document.getElementById('full-name').textContent = (_a = data.full_name) !== null && _a !== void 0 ? _a : '';
        document.getElementById('title').textContent = (_b = data.title) !== null && _b !== void 0 ? _b : '';
        document.getElementById('tagline').textContent = (_c = data.tagline) !== null && _c !== void 0 ? _c : '';
        const labels = ['ABOUT', 'EXPERIENCE', 'SKILLS'];
        const labelsList = document.getElementById('labels');
        labels.forEach(l => {
            const li = document.createElement('li');
            li.textContent = l;
            labelsList.appendChild(li);
        });
        const socialList = document.getElementById('social');
        (_d = data.social) === null || _d === void 0 ? void 0 : _d.forEach(s => {
            const a = document.createElement('a');
            a.href = s.url;
            a.textContent = s.name;
            a.className = 'text-teal-400 hover:underline';
            socialList.appendChild(a);
        });
        const bioContainer = document.getElementById('bio');
        (_e = data.bio) === null || _e === void 0 ? void 0 : _e.forEach(p => {
            const paragraph = document.createElement('p');
            paragraph.className = 'mb-4';
            paragraph.textContent = p;
            bioContainer.appendChild(paragraph.cloneNode(true));
        });
        const aboutContainer = document.getElementById('about-text');
        (_f = data.bio) === null || _f === void 0 ? void 0 : _f.forEach(p => {
            const paragraph = document.createElement('p');
            paragraph.className = 'mb-4';
            paragraph.textContent = p;
            aboutContainer.appendChild(paragraph);
        });
    });
}
function loadExperience() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetchJSON('datasets/experiences.json');
        if (!data)
            return;
        const container = document.getElementById('experience');
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
    });
}
function loadSkills() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetchJSON('datasets/skills.json');
        if (!data)
            return;
        const container = document.getElementById('skills');
        const ul = document.createElement('ul');
        ul.className = 'grid grid-cols-2 gap-2';
        data.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            ul.appendChild(li);
        });
        container.appendChild(ul);
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield loadProfile();
        yield loadExperience();
        yield loadSkills();
    });
}
document.addEventListener('DOMContentLoaded', init);
