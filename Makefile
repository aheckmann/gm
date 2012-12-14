

test:
	@node test/ $(TESTS)

test-all:
	@node test/ --integration $(TESTS)

.PHONY: test
