class Job extends HTMLTableRowElement{
	constructor(obj) {
		super()
		Object.assign(this, obj)

		this.setAttribute('job_id', obj.job_id)
		this.setAttribute('status', obj.status)

		this.tableComment = document.createElement('td')
		this.tableComment.innerHTML = this.comment;
		
		this.tableLanguage = document.createElement('td')
		this.tableLanguage.innerHTML = languages[this.language][0];

		this.tableStartDate = document.createElement('td')
		this.tableStartDate.innerHTML = new Date(this.creation_date).toLocaleString();
		
		let tableStatusCell = document.createElement('td')
		this.tableStatus = document.createElement('span')
		tableStatusCell.append(this.tableStatus)
		
		this.append(this.tableComment)
		this.append(this.tableLanguage)
		this.append(this.tableStartDate)
		this.append(tableStatusCell)

		this.setStatus(this.status)
	}
	
	getText(node) {
		let text = '';
		if (node.nodeType === document.TEXT_NODE){
			text += node.nodeValue + ' ';
		}else{
			for (let child of node.childNodes){
				text += this.getText(child);
			}
		}
		return text;
	  }

	contains(text){
		return this.getText(this).toLowerCase().includes(text.toLowerCase());
	}

	show(){
		this.style.display = "table-row";
	}
	hide(){
		this.style.display = "none";
	}

	setStatus(newStatus){
		this.tableStatus.innerHTML = statuses[newStatus]
		if(newStatus == completedStatus){
			this.tableComment.innerHTML = `<a href="/jobs/${this.job_id}/result/" style="text-decoration: none;">${this.comment}</a>`
		}

		this.tableStatus.className = '';
		
		let classes = ['badge', statusMapping[newStatus]];

		this.tableStatus.classList.add(...classes)
	}
}
customElements.define('job-row', Job, { extends: 'tr' });
