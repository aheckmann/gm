
test:
	@node test/ --integration $(TESTS)

test-unit:
	@node test/ $(TESTS)

.PHONY: test test-unit
