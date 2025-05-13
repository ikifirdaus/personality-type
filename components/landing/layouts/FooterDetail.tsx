export default function FooterDetail() {
  return (
    <>
      {/* Footer */}
      <footer className="mt-16 pt-12 border-t text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-700">
            NJPT (Neuroscience Jungian Personality Type)
          </span>
          . All rights reserved.
        </p>
      </footer>
    </>
  );
}
