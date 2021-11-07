export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
            <div class="notes__preview">
                <input class="notes__title" type="text" placeholder="Subject...">
                <textarea class="notes__body" placeholder="Note..." ></textarea>
            </div>
            <div class="notes__sidebar">
                <button class="notes__add" type="button">Add Note</button>
                <div class="notes__list"></div>
            </div>
            
        `;

        const btnAddNote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");

        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        this.updateNotePreviewVisibility(false);
    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 20;

        return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                ${body}
                </div>
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
                <div class="notes__small-repost">
                                <a href="" class="repost-link"><img src="" alt="">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="14" cy="14" r="14" fill="#C4C4C4" />
                                        <path
                                            d="M12.1102 15.9675L11.8486 19.7514C12.2228 19.7514 12.3849 19.5861 12.5793 19.3875L14.3337 17.6629L17.9692 20.4013C18.636 20.7835 19.1057 20.5822 19.2856 19.7704L21.6719 8.26942L21.6726 8.26874C21.884 7.25499 21.3161 6.85857 20.6665 7.10726L6.63983 12.6307C5.68253 13.0129 5.69703 13.5618 6.47709 13.8105L10.0631 14.9578L18.3929 9.59692C18.7849 9.32993 19.1413 9.47766 18.8481 9.74465L12.1102 15.9675Z"
                                            fill="black" />
                                    </svg>
                                </a>
                                <a href="" class="repost-link"><img src="" alt="">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="14" cy="14" r="14" fill="#C4C4C4" />
                                <g clip-path="url(#clip0_25:278)">
                                    <path
                                        d="M19.2771 15.1609C19.0185 14.8459 19.0925 14.7057 19.2771 14.4241C19.2805 14.4209 21.4159 11.5756 21.6359 10.6107L21.6372 10.6101C21.7465 10.2584 21.6372 10 21.1085 10H19.3591C18.9138 10 18.7084 10.2218 18.5984 10.4699C18.5984 10.4699 17.7077 12.5258 16.4477 13.8584C16.041 14.2435 15.853 14.3669 15.631 14.3669C15.5217 14.3669 15.3517 14.2435 15.3517 13.8919V10.6101C15.3517 10.1884 15.227 10 14.8583 10H12.1075C11.8282 10 11.6622 10.1967 11.6622 10.3799C11.6622 10.7798 12.2922 10.8717 12.3576 11.9967V14.4376C12.3576 14.9725 12.2569 15.0709 12.0335 15.0709C11.4389 15.0709 9.99547 13.0066 9.14011 10.6441C8.96744 10.1858 8.79876 10.0006 8.35008 10.0006H6.60002C6.10067 10.0006 6 10.2224 6 10.4706C6 10.909 6.59469 13.0889 8.76543 15.9689C10.2121 17.9348 12.2496 19 14.103 19C15.217 19 15.353 18.7634 15.353 18.3565C15.353 16.4781 15.2523 16.3006 15.8103 16.3006C16.069 16.3006 16.5144 16.4241 17.5544 17.3723C18.7431 18.4966 18.9384 19 19.6038 19H21.3532C21.8519 19 22.1046 18.7634 21.9592 18.2967C21.6265 17.3151 19.3785 15.2959 19.2771 15.1609Z"
                                        fill="black" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_25:278">
                                        <rect width="16" height="9" fill="white" transform="translate(6 10)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14" cy="14" r="14" fill="#C4C4C4" />
                            <path
                                d="M17.0648 5.4668H10.7386C7.82751 5.4668 5.4668 7.82751 5.4668 10.7386V17.0648C5.4668 19.9758 7.82751 22.3365 10.7386 22.3365H17.0648C19.9758 22.3365 22.3365 19.9758 22.3365 17.0648V10.7386C22.3365 7.82751 19.9758 5.4668 17.0648 5.4668ZM20.755 17.0648C20.755 19.0997 19.0997 20.755 17.0648 20.755H10.7386C8.70368 20.755 7.04834 19.0997 7.04834 17.0648V10.7386C7.04834 8.70368 8.70368 7.04834 10.7386 7.04834H17.0648C19.0997 7.04834 20.755 8.70368 20.755 10.7386V17.0648Z"
                                fill="black" />
                            <path
                                d="M13.9015 9.68408C11.5724 9.68408 9.68408 11.5724 9.68408 13.9015C9.68408 16.2306 11.5724 18.119 13.9015 18.119C16.2306 18.119 18.119 16.2306 18.119 13.9015C18.119 11.5724 16.2306 9.68408 13.9015 9.68408ZM13.9015 16.5374C12.4486 16.5374 11.2656 15.3544 11.2656 13.9015C11.2656 12.4476 12.4486 11.2656 13.9015 11.2656C15.3544 11.2656 16.5374 12.4476 16.5374 13.9015C16.5374 15.3544 15.3544 16.5374 13.9015 16.5374Z"
                                fill="black" />
                            <path
                                d="M18.4355 9.9301C18.7459 9.9301 18.9975 9.6785 18.9975 9.36813C18.9975 9.05776 18.7459 8.80615 18.4355 8.80615C18.1251 8.80615 17.8735 9.05776 17.8735 9.36813C17.8735 9.6785 18.1251 9.9301 18.4355 9.9301Z"
                                fill="black" />
                        </svg>
                            </div>
            </div>
        `;
    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes__list");

        // Empty list
        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        // Add select/delete events for each list item
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this note?");

                if (doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }

    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected");
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}
