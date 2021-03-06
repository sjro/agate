const Page = require('./SwitchItemPage');

describe('SwitchItem', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first item at start', function () {
		expect(Page.components.switchItemDefault.self.isFocused()).to.be.true();
	});

	describe('default', function () {
		const switchItem = Page.components.switchItemDefault;

		it('should have correct text', function () {
			expect(switchItem.textContent).to.equal('Switch Item1');
		});

		it('should not be selected', function () {
			expect(switchItem.isSelected).to.be.false();
		});

		describe('5-way', function () {
			it('should select the item when selected', function () {
				Page.spotlightSelect();
				expect(switchItem.isSelected).to.be.true();
			});

			it('should re-unselect the item when selected twice', function () {
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(switchItem.isSelected).to.be.false();
			});

			it('should move focus down on SpotlightDown', function () {
				Page.spotlightDown();
				expect(Page.components.switchItemDefaultSelected.self.isFocused()).to.be.true();
			});

			it('should move focus up on SpotlightUp', function () {
				Page.components.switchItemDefaultSelected.focus();
				Page.spotlightUp();
				expect(switchItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should select the item when clicked', function () {
				switchItem.self.click();
				expect(switchItem.isSelected).to.be.true();
			});

			it('should re-unselect the item when clicked twice', function () {
				switchItem.self.click();
				switchItem.self.click();
				expect(switchItem.isSelected).to.be.false();
			});
		});
	});

	describe('default selected', function () {
		const switchItem = Page.components.switchItemDefaultSelected;

		it('should have correct text', function () {
			expect(switchItem.textContent).to.equal('Switch Item selected');
		});

		it('should be selected', function () {
			expect(switchItem.isSelected).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				switchItem.focus();
				Page.spotlightSelect();
				expect(switchItem.isSelected).to.be.false();
			});

			it('should re-select the item when selected twice', function () {
				switchItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(switchItem.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				switchItem.self.click();
				expect(switchItem.isSelected).to.be.false();
			});

			it('should re-select the item when clicked twice', function () {
				switchItem.self.click();
				switchItem.self.click();
				expect(switchItem.isSelected).to.be.true();
			});
		});
	});

	describe('inline', function () {
		const switchItem = Page.components.switchItemInline;

		it('should have correct text', function () {
			expect(switchItem.textContent).to.equal('Switch Item inline');
		});

		it('should be selected', function () {
			expect(switchItem.isSelected).to.be.true();
		});

		it('should display item inline', function () {
			expect(switchItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				switchItem.focus();
				Page.spotlightSelect();
				expect(switchItem.isSelected).to.be.false();
			});

			it('should re-select the item when selected twice', function () {
				switchItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(switchItem.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				switchItem.self.click();
				expect(switchItem.isSelected).to.be.false();
			});

			it('should re-select the item when clicked twice', function () {
				switchItem.self.click();
				switchItem.self.click();
				expect(switchItem.isSelected).to.be.true();
			});
		});
	});

	// Note, the disabled test below requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.
	describe('disabled', function () {
		const switchItem = Page.components.switchItemDisabled;
		const prevSwitchItem = Page.components.switchItemInline;

		it('should have correct text', function () {
			expect(switchItem.textContent).to.equal('Switch Item disabled');
		});

		it('should be selected', function () {
			expect(switchItem.isSelected).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the item', function () {
				prevSwitchItem.focus();
				Page.spotlightDown();
				expect(switchItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', function () {
				switchItem.self.click();
				expect(switchItem.isSelected).to.be.true();
			});
		});
	});
	// Note, the disabled test above/below requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.

	describe('inline disabled', function () {
		const switchItem = Page.components.switchItemInlineDisabled;
		const prevSwitchItem = Page.components.switchItemDisabled;

		it('should have correct text', function () {
			expect(switchItem.textContent).to.equal('Switch Item inline disabled');
		});

		it('should be selected', function () {
			expect(switchItem.isSelected).to.be.true();
		});

		it('should display item inline', function () {
			expect(switchItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the item', function () {
				prevSwitchItem.focus();
				Page.spotlightDown();
				expect(switchItem.self.isFocused()).to.be.true();
			});

			it('should not unselect the item when selected', function () {
				switchItem.focus();
				Page.spotlightSelect();
				expect(switchItem.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', function () {
				switchItem.self.click();
				expect(switchItem.isSelected).to.be.true();
			});
		});
	});
	// Note, the disabled test above requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.
});
