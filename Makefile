
test: security
	@node test/ --integration $(TESTS)

test-unit: security
	@node test/ $(TESTS)

security:
	npm audit

.PHONY: test test-unit security
